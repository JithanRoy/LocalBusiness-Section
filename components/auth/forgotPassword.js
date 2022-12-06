import React from 'react';
import Image from 'next/image';
import Logo from '../../public/assets/logo.png'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Hidden,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import AuthLayout from './layout';
import { loginSchema } from './utils/helper';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSnackbar } from 'notistack';

import Cookies from 'js-cookie';
import axios from 'axios';

const ForgotPassword = () => {
  const [isSend, setIsSend] = React.useState(false);
  const defaultValues = {
    email: '',
  };

  const { enqueueSnackbar } = useSnackbar();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    //resolver: yupResolver(loginSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_API_URL}/password-reset-email`,
        values
      );
      console.log('response', response);
      if (response.status === 200) {
        Cookies.set('token', response.data.token);
        enqueueSnackbar(response.data.message, { variant: 'success' });
        setIsSend(true)
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        enqueueSnackbar(err.response.data.message, { variant: 'error' });
      }
    }
    reset();
  };

  return (
    <AuthLayout>
    {!isSend &&(
      <form
        name="forgotPasswordForm"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-5 py-5 justify-start sm:justify-center items-center h-screen"
      >
        <Hidden smUp>
          <div className="flex justify-center items-center my-10">
            <Image src={Logo} alt="logo" className="h-20 w-full"/>
          </div>
        </Hidden>
        <div className="headline4 mb-7 text-left">Forgot password?</div>
        <div className="headline8 text-center mb-14 w-full md:w-96">
          No worries! Just enter your email and we’ll send you a reset password
          link.
        </div>
        <div className=" flex flex-col gap-7 items-center justify-between w-full md:w-96">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                className="bg-white"
                autoFocus={true}
                placeholder="Email"
                error={!!errors.email}
                helpertext={errors?.email?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="text-white hover:bg-primaryHover cursor-pointer my-5 capitalize p-4 w-full md:w-96 rounded-md font-bold shadow-none hover:shadow-none bg-primary"
        >
          Send Recovery Email
        </button>

        <p className="mx-auto my-7">
          Just remember?
          <Link href="/auth/login">
            <span className="text-blue-600 my-5 text-[color:var(--form-button-color)] cursor-pointer ml-1">
              Sign in
            </span>
          </Link>
        </p>
      </form>
    )}
    {
      isSend &&(
        <div className='flex justify-center items-center flex-col gap-5 h-screen'>
        <div>An Email has been sent to your account with the reset password link</div>
        <Link className='underline text-blue-500 ' href='/auth/login'>Login</Link>
        </div>
      )
    }
    </AuthLayout>
  );
};

export default ForgotPassword;
