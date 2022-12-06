import React from 'react';
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from '@mui/material';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema } from '../../auth/utils/helper';

const ContactForm = () => {
  const defaultValues = {
    email: '',
    fullname: '',
    companyName: '',
    subject: '',
    message: '',
  };

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(contactSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = (values) => {
    console.log(values);
    reset();
  };
  return (
    <div className="my-20  max-w-7xl mx-auto">
      <form
        name="contactform"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-5 py-10 justify-center items-center"
      >
        <div className=" flex flex-col gap-5 items-center justify-between lg:w-3/4 md:w-3/4">
          <div className="grid grid-cols-2 gap-5 w-full">
            <div>
              <Controller
                name="fullname"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    if (value === '') {
                      return 'Please provide input name';
                    }
                  },
                }}
                render={({ field }) => (
                  <>
                    <InputLabel className="headline7 text-[16px]">
                      Full Name
                    </InputLabel>
                    <TextField
                      {...field}
                      type="text"
                      className="bg-white rounded mt-2"
                      autoFocus={true}
                      placeholder="Input your full name"
                      error={!!errors.fullname}
                      helpertext={errors?.fullname?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </>
                )}
              />
            </div>

            <div>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel className="headline7 text-[16px]">
                      Company Name
                    </InputLabel>
                    <TextField
                      {...field}
                      type="text"
                      className="bg-white rounded mt-2"
                      autoFocus={true}
                      placeholder="Input your company name"
                      error={!!errors.companyName}
                      helpertext={errors?.companyName?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 w-full">
            <div>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    if (value === '') {
                      return 'Please provide input name';
                    }
                  },
                }}
                render={({ field }) => (
                  <>
                    <InputLabel className="headline7 text-[16px]">
                      Email Address
                    </InputLabel>
                    <TextField
                      {...field}
                      type="email"
                      className="bg-white rounded mt-2"
                      autoFocus={true}
                      placeholder="Input your email address"
                      error={!!errors.email}
                      helpertext={errors?.email?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </>
                )}
              />
            </div>

            <div>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel className="headline7 text-[16px]">
                      Subject
                    </InputLabel>
                    <TextField
                      {...field}
                      type="text"
                      className="bg-white rounded mt-2"
                      autoFocus={true}
                      placeholder="Enter your subject"
                      error={!!errors.subject}
                      helpertext={errors?.subject?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </>
                )}
              />
            </div>
          </div>
          <div className="w-full">
            <Controller
              name="message"
              control={control}
              rules={{
                required: true,
                validate: (value) => {
                  if (value === '') {
                    return 'Please provide input name';
                  }
                },
              }}
              render={({ field }) => (
                <>
                  <InputLabel className="headline7 text-[16px]">
                    Messages
                  </InputLabel>
                  <TextareaAutosize
                    {...field}
                    type="text"
                    minRows={8}
                    className="bg-white rounded w-full  border-solid border-2  mt-2 py-2 px-2"
                    placeholder="Write your messages in here"
                    variant="outlined"
                    required
                  />
                </>
              )}
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white hover:bg-primaryHover cursor-pointer my-5 capitalize p-4 w-full md:w-96 rounded-md font-bold shadow-none hover:shadow-none bg-primary"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
