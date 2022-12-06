import React from "react";
import { Controller, TextField, useForm } from "react-hook-form";

const regsteptwo = (props) => {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const { isValid, dirtyFields, errors } = formState;

  const defaultValues = {
    companywebsite: "",
    companytype: "",
    address: "",
    password: "",
    userName: "",
    companyName: "",
  };
  const onSubmit = (values) => {
    console.log(values);
    const data = {
      username: values.userName,
      password: values.password,
      company_name: values.companyName,
      companyWebsite: values.companywebsite,
    };
  };

  return (
    <form
      name="registrationform"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-5 py-10 justify-center items-center gap-4"
    >
      <div className="">
        {/* <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="userName"
              type="text"
              className="bg-white rounded"
              autoFocus={true}
              placeholder="UserName"
              error={!!errors.email}
              helpertext={errors?.email?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        /> */}
      </div>
    </form>
  );
};

export default regsteptwo;
