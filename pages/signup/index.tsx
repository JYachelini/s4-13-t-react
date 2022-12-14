import type { NextPage } from 'next';
import Head from 'next/head';
import FormLinks from '../../components/formRegister/FormLinks';
import FormRegister from '../../components/formRegister/FormRegister';
import { HrComponent } from '../../components/formRegister/HrComponent';
import { MediaContainer } from '../../components/formRegister/MediaContainer';
import LayoutFormPages from '../../components/layout/LayoutFormPages';
import { usePublicRoute } from '../../hooks/usePublicRoute';

const Register: NextPage = () => {
  const data = usePublicRoute();

  if (data?.access_token) return null;

  return (
    <div>
      <Head>
        <title>Register - Memex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutFormPages heading="registro">
        <div className="flex flex-col justify-center items-center">
          <FormRegister />
          <FormLinks question="¿ya tenés cuenta?" anchor="/login" achorText="Ingresá" />
          <HrComponent />
          <MediaContainer />
        </div>
      </LayoutFormPages>
    </div>
  );
};

export default Register;
