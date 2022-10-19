import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { GoogleButton, IAuthorizationOptions, GoogleAuth, GoogleAuthConsumer, IOAuthState } from 'react-google-oauth2';
import MediaButton from './MediaButton';

export const MediaContainer = () => {
  const googleSuccess = (response: any) => {
    console.log(response);
  };
  const googleFailure = (response: any) => {
    console.log(response);
  };

  const options: IAuthorizationOptions = {
    clientId: '501512337841-2a4e5h5oeeeanue6hjasokv2fvc0cvqm.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    redirectUri: 'http://localhost:3000',
  };

  return (
    <div className="flex flex-col gap-4">
      <MediaButton social="google" />
      {/* <GoogleLogin
        clientId="501512337841-2a4e5h5oeeeanue6hjasokv2fvc0cvqm.apps.googleusercontent.com"
        buttonText="login with google"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
      /> */}
      {/* <GoogleAuth>
        <GoogleAuthConsumer>
          {({ responseState, isAuthenticated }: IOAuthState) => {
            if (!isAuthenticated) {
              return (
                <GoogleButton options={options} apiUrl="http://localhost:8080/login/google">
                  Google
                </GoogleButton>
              );
            } else {
              fetch('http://localhost:8080/login/google')
              console.log(responseState);
            }
          }}
        </GoogleAuthConsumer>
      </GoogleAuth> */}
      <MediaButton social="facebook" />
    </div>
  );
};
