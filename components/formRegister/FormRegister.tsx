import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { signup } from '../../redux/slice/userSignupSlice';
import { RegisterProps } from '../../interfaces';
import useToggleView from '../../hooks/useToggleView';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { register } from '../../services/auth-calls';
import { useRouter } from 'next/router';

const validateRegisterSchema = Yup.object({
  email: Yup.string().email('Debes ingresar un email válido').required('Email requerido'),
  username: Yup.string()
    .min(4, 'El nombre de usuario es demasiado corto')
    .max(15, 'El nombre de usuario es demasiado largo')
    .required('Nombre de usuario requerido'),
  password: Yup.string().min(6, 'El password debe tener al menos 6 caracteres').required('Password requerido'),
});

const FormRegister = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { handleToggle, toggleView } = useToggleView();
  const [error, setError] = useState<string>('');

  return (
    <>
      <h4 className="text-sm max-w-[250px] py-6 text-center font-semibold text-black">
        Vas a poder hacer comentarios, agregar a favoritos y subir memes!
      </h4>
      {error ? <p>{error}</p> : null} {/* TODO = Aplicar estilos a este error. */}
      {
        <Formik
          initialValues={{ email: '', username: '', password: '' }}
          onSubmit={async (values: RegisterProps, { resetForm }) => {
            // dispatch(signup(values));
            const { data, error } = await register(values);

            if (error) {
              setError(error.message);
            } else {
              router.push('/login');
            }
            // resetForm();
          }}
          validationSchema={validateRegisterSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form className="flex flex-col justify-center align-center gap-4 select-none">
                <Field
                  name="username"
                  placeholder="Nombre"
                  autoComplete="off"
                  className="w-[295px] placeholder:text-accent font-roboto border-[1px] rounded-[4px] border-accent px-2 py-1"
                />
                {errors.username && touched.username ? <div className="text-xs">{errors.username}</div> : null}
                <Field
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  className="placeholder:text-accent font-roboto border-[1px] rounded-[4px] border-accent w-[295px] px-2 py-1"
                />
                {errors.email && touched.email ? <div className="text-xs">{errors.email}</div> : null}
                <div className="relative">
                  <Field
                    name="password"
                    type={`${toggleView ? 'text' : 'password'}`}
                    autoComplete="off"
                    placeholder="Contraseña"
                    className="placeholder:text-accent font-roboto border-[1px] rounded-[4px] border-accent w-[295px] px-2 py-1"
                  />
                  <div className="absolute top-2 right-5 text-xl">
                    <AiFillEye
                      className={`cursor-pointer ${toggleView ? 'hidden' : 'block'} `}
                      onClick={handleToggle}
                    />
                    <AiFillEyeInvisible
                      className={`cursor-pointer ${toggleView ? 'block' : 'hidden'} `}
                      onClick={handleToggle}
                    />
                  </div>
                </div>
                {errors.password && touched.password ? <div className="text-xs">{errors.password}</div> : null}
                <button
                  type="submit"
                  className="border-2 font-bold border-primary font-roboto rounded-lg px-4 py-1 text-primary"
                >
                  Registrate
                </button>
              </Form>
            );
          }}
        </Formik>
      }
    </>
  );
};

export default FormRegister;
