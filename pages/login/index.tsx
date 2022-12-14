import type { NextPage } from 'next';
import Head from 'next/head';
import FormLogin from '../../components/formLogin/FormLogin';
import LayoutFormPages from '../../components/layout/LayoutFormPages';
import FormLinks from '../../components/formRegister/FormLinks';
import { HrComponent } from '../../components/formRegister/HrComponent';
import { MediaContainer } from '../../components/formRegister/MediaContainer';
import { usePublicRoute } from '../../hooks/usePublicRoute';

const Login: NextPage = () => {
  const data = usePublicRoute();

  if (data?.access_token) return null;

  return (
    <div>
      <Head>
        <title>Login - Memex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutFormPages heading="ingreso">
        <div className="flex flex-col justify-center items-center">
          <FormLogin />
          <FormLinks question="¿no tenes cuenta?" anchor="/signup" achorText="Registrate" />
          <HrComponent />
          <MediaContainer />
        </div>
      </LayoutFormPages>
    </div>
  );
};

export default Login;
