import { yupResolver } from '@hookform/resolvers/yup';
import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import authAxios from '../../../library/apis/api-client';
import { EditProfileSchema } from '../../../schemas/auth/index';

const UPDATE_USER = 'users/updateUser'

const EditProfile = (props) => {

  const {open, data, setOpen} = props

  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  const defaultValues = {
    userName: data?.username || "Hello",
    firstName: data?.firstname || "",
    lastName: data?.lastname || "",
    email: data?.email || "",
    phone: data?.phoneNumber || "",
    companyName: data?.company_name || "",
    companyWebsite: data?.companyWebsite || "",
    companyType: data?.companyType || "",
    country: data?.country || "",
    city: data?.city || "",
    countryCode: data?.countryCode || "",
    postCode: data?.post_code || "",
    address: data?.Address || "",
  };

  const { control, formState, handleSubmit, register } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(EditProfileSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async (values) => {
    const data = {
      city: values?.city,
      firstname: values?.firstName,
      lastname: values?.lastName,
      company_name: values?.companyName,
      post_code: values?.postCode,
      phoneNumber: values?.phone,
      companyWebsite: values?.companyWebsite,
      companyType: values?.companyType,
      Address: values?.address,
      country: values?.country,
      countryCode: values?.countryCode,
      provinceOrState: values?.city,
    };
    try {
      const response = await authAxios.put(`/${UPDATE_USER}`, data);
      console.log('response', response?.data?.details);
      if (response.status === 200) {
        enqueueSnackbar('User updated successfully', { variant: 'success' });
        setOpen(false)
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        enqueueSnackbar(err.response.data.message, { variant: 'error' });
      }
    }
  };

  return (
    <Dialog
      maxWidth='md'
      fullWidth={true}
      open={open}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <div className='flex justify-between items-center px-5 mt-3'>
          Edit Profile
          <IconButton aria-label="close" onClick={handleClose}>
            <Close />
          </IconButton>
        </div>

      </DialogTitle>
      <DialogContent>
        <form
          name="SigninForm"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col px-5 py-5 justify-start sm:justify-center items-center"
        >
          <div className=" flex flex-col gap-7 items-center justify-between w-full">
            <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    type="text"
                    className="bg-white col-span-1 md:col-span-3"
                    autoFocus={true}
                    placeholder="Username"
                    helpertext={errors?.userName?.message}
                    variant="outlined"
                    error={!!errors?.userName}
                    required
                    fullWidth
                  />
                )}
              />
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    type="text"
                    className="bg-white"
                    autoFocus={true}
                    placeholder="First Name"
                    helpertext={errors?.firstName?.message}
                    variant="outlined"
                    error={!!errors?.firstName}
                    required
                    fullWidth
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    type="text"
                    className="bg-white"
                    autoFocus={true}
                    placeholder="Last Name"
                    helpertext={errors?.lastName?.message}
                    variant="outlined"
                    error={!!errors?.lastName}
                    required
                    fullWidth
                  />
                )}
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 w-full'>
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
                    helpertext={errors?.email?.message}
                    variant="outlined"
                    error={!!errors?.email}
                    required
                    fullWidth
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    type="text"
                    className="bg-white"
                    autoFocus={true}
                    placeholder="Phone"
                    helpertext={errors?.phone?.message}
                    variant="outlined"
                    error={!!errors?.phone}
                    required
                    fullWidth
                  />
                )}
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 w-full'>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Name"
                    type="text"
                    className="bg-white"
                    autoFocus={true}
                    placeholder="Company Name"
                    helpertext={errors?.companyName?.message}
                    variant="outlined"
                    error={!!errors?.companyName}
                    required
                    fullWidth
                  />
                )}
              />
              <Controller
                name="companyWebsite"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Website"
                    type="text"
                    className="bg-white"
                    autoFocus={true}
                    placeholder="Company Website"
                    helpertext={errors?.companyWebsite?.message}
                    variant="outlined"
                    error={!!errors?.companyWebsite}
                    required
                    fullWidth
                  />
                )}
              />
            </div>
            <div className='grid grid-cols-1 gap-5 w-full'>
              <Controller
                name="companyType"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Type"
                    type="text"
                    className="bg-white"
                    autoFocus={true}
                    placeholder="Company Type"
                    helpertext={errors?.companyType?.message}
                    variant="outlined"
                    error={!!errors?.companyType}
                    required
                    fullWidth
                  />
                )}
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full'>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    type="text"
                    className="bg-white"
                    autoFocus={true}
                    placeholder="Country"
                    helpertext={errors?.country?.message}
                    variant="outlined"
                    error={!!errors?.country}
                    required
                    fullWidth
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="State/City"
                    type="text"
                    className="bg-white"
                    autoFocus={true}
                    placeholder="State/City"
                    helpertext={errors?.city?.message}
                    variant="outlined"
                    error={!!errors?.city}
                    required
                    fullWidth
                  />
                )}
              />
              <Controller
                name="countryCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country Code"
                    type="text"
                    className="bg-white"
                    autoFocus={true}
                    placeholder="Country Code"
                    helpertext={errors?.countryCode?.message}
                    variant="outlined"
                    error={!!errors?.countryCode}
                    required
                    fullWidth
                  />
                )}
              />
              <Controller
                name="postCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Post Code"
                    type="text"
                    className="bg-white"
                    autoFocus={true}
                    placeholder="Post Code"
                    helpertext={errors?.postCode?.message}
                    variant="outlined"
                    error={!!errors?.postCode}
                    required
                    fullWidth
                  />
                )}
              />

            </div>
            <div className='w-full'>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    type="text"
                    multiline={true}
                    rows={5}
                    className="bg-white"
                    autoFocus={true}
                    placeholder="Address"
                    helpertext={errors?.address?.message}
                    variant="outlined"
                    error={!!errors?.address}
                    required
                    fullWidth
                  />
                )}
              />
            </div>
          </div>
          <div className='flex justify-end items-center w-full mt-7'>
            <div>
              <Button className='border-2 border-primary capitalize text-base text-primary' type='button' autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button type='submit' className='bg-primary capitalize text-base text-white  hover:text-black ml-5' autoFocus>
                Update Profile
              </Button>
            </div>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  )
}

export default EditProfile

