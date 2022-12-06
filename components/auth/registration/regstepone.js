import React, { useState } from "react";

import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Autocomplete,
  Box,
} from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

import { Controller, useForm, FormProvider } from "react-hook-form";

import { regiSchema } from "../utils/helper";
import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";
import { countries } from "../utils/reg-country-data";

const regstepone = () => {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(regiSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  //   const onSubmit = async (values) => {
  //     console.log(values);
  //     const data = {
  //       username: values.userName,
  //       firstname: values.firstname,
  //       lastname: values.lastname,
  //       password: values.password,
  //       email: values.email,
  //       company_name: values.companyName,
  //       companyWebsite: values.companywebsite,
  //       Address: values.address,
  //       city: "Leicester",
  //       post_code: values.zip,
  //       companyType: values.companytype,
  //       country: "England",
  //       phoneNumber: values.phonenumber,
  //       countryCode: "ENG",
  //       provinceOrState: "Leicestershire",
  //     };
  //     try {
  //       const response = await axios.post(
  //         ` http://tulip-1708405571.eu-west-2.elb.amazonaws.com:8080/api/auth/register`,
  //         data
  //       );
  //       console.log(response);
  //       if (response.status === 200) {
  //         enqueueSnackbar(response.data.message, { variant: "success" });
  //         router.push("/auth/login");
  //       }
  //     } catch (err) {
  //       if (err.response) {
  //         enqueueSnackbar(err.response.data.message, { variant: "error" });
  //       }
  //       console.log(err);
  //     }
  //   };

  return (
    <>
      {/* firstname,lastname */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        <Controller
          name="firstname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              type="text"
              className="bg-white rounded"
              autoFocus={true}
              placeholder="First Name"
              error={!!errors.firstname}
              helpertext={errors?.firstname?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />

        <Controller
          name="lastname"
          control={control}
          rules={{
            required: true,
            validate: (value) => {
              if (value === "") {
                return "Please provide input name";
              }
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              type="text"
              className="bg-white rounded"
              autoFocus={true}
              placeholder="Last Name"
              error={!!errors.lastname}
              helpertext={errors?.lastname?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />
      </div>

      {/* Email address */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            type="email"
            className="bg-white rounded"
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

      {/* phone number */}
      <Controller
        name="phonenumber"
        control={control}
        rules={{ validate: matchIsValidTel }}
        render={({ field, fieldState }) => (
          <MuiTelInput
            {...field}
            label="Phone Number"
            className="bg-white rounded"
            defaultCountry="GB"
            autoFocus={true}
            placeholder="Phone Number"
            // helperText={fieldState.invalid ? "phonenumber is invalid" : ""}
            error={fieldState.invalid}
            variant="outlined"
            required
            fullWidth
          />
        )}
      />

      {/* country select */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        <Autocomplete
          id="country-select-demo"
          sx={{ backgroundColor: "white" }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width={20}
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              required
              {...params}
              label="Choose a country"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
        <Controller
          name="State"
          control={control}
          rules={{
            required: true,
            validate: (value) => {
              if (value === "") {
                return "Please provide State/City";
              }
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="State/City"
              type="text"
              className="bg-white rounded"
              autoFocus={true}
              placeholder="State/City"
              error={!!errors.companywebsite}
              helpertext={errors?.companywebsite?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />
      </div>

      {/* Country code post code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <Controller
          name="zip"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Country Code"
              type="number"
              className="bg-white rounded col-span-1"
              autoFocus={true}
              placeholder="Country Code"
              error={!!errors.zip}
              helpertext={errors?.zip?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />

        <Controller
          name="zip"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Post Code"
              type="number"
              className="bg-white rounded col-span-1"
              autoFocus={true}
              placeholder="Post Code"
              error={!!errors.zip}
              helpertext={errors?.zip?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />
      </div>

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Address"
            type="text"
            className="bg-white rounded col-span-1"
            autoFocus={true}
            placeholder="Address"
            error={!!errors.address}
            helpertext={errors?.address?.message}
            variant="outlined"
            required
            fullWidth
          />
        )}
      />
      {/* <button
              type="submit"
              className="text-white hover:bg-primaryHover bg-primary cursor-pointer my-5 capitalize p-4 rounded-md font-bold shadow-none hover:shadow-none w-full"
            >
              Next
        /button> */}
    </>
  );
};

export default regstepone;
