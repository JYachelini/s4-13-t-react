import { GetUserData, ILike, IPost, LoginProps } from './../../interfaces/index.d';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postLogin } from '../../services/auth-calls';
import { WritableDraft } from 'immer/dist/internal';
import { getUserLikes } from '../../services/api-calls';
import { useDispatch } from 'react-redux';
import { getCookies } from 'cookies-next';

// const fetchUserLikes = createAsyncThunk(
//   'user/likes',
//   async (id: number) => {
//     const res = await getUserLikes(id);
//     return res;
//   }
// )
export interface UserDataState {
  data: GetUserData | null;
  likes: ILike[];
  error: string | null;
  logged: boolean;
}

const initialState: UserDataState = {
  data: {
    access_token: '',
    refresh_token: '',
    user: {
      id: '',
      username: '',
      email: '',
      role: [],
      avatar_url: '',
    },
  },
  likes: [],
  error: null,
  logged: false,
};

const userDataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getData: (state, action: PayloadAction<GetUserData>) => {
      state.data = action.payload;
      localStorage.setItem('access_token', JSON.stringify(state.data.access_token));
      localStorage.setItem('refresh_token', JSON.stringify(state.data.refresh_token));
      localStorage.setItem('user', JSON.stringify(state.data.user));
      state.logged = true;
      return;
    },
    getLikes: (state, action: PayloadAction<ILike[]>) => {
      state.likes = action.payload;
    },
    addRemoveLike: (state, action: PayloadAction<ILike>) => {
      if (!state.likes.find(like => like.post.id === action.payload.post.id)) {
        state.likes.push(action.payload);
      } else {
        const likesArray = state.likes.filter(like => like.post.id !== action.payload.post.id);
        console.log(likesArray);
      }
    },
    logout: state => {
      state.data = initialState.data;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      state.logged = false;
      return;
    },
    loadAuthData: (state, action: PayloadAction<ILike[]>) => {
      if (localStorage.getItem('access_token')) {
        const access_token = JSON.parse(localStorage.getItem('access_token') || '');
        const refresh_token = JSON.parse(localStorage.getItem('refresh_token') || '');
        const user = JSON.parse(localStorage.getItem('user') || '');
        state.data = { access_token, user, refresh_token };
        state.logged = true;
        state.likes = action.payload;
      }
    },
    setTokens: (state, action: PayloadAction<{ access_token: string; refresh_token: string }>) => {
      state.data!.access_token = action.payload.access_token;
      state.data!.refresh_token = action.payload.refresh_token;
      return;
    },
  },
});

export const { getData, getLikes, addRemoveLike, logout, loadAuthData, setTokens } = userDataSlice.actions;

export default userDataSlice.reducer;
