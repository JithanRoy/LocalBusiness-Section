import React, { useEffect, useState } from 'react';
import { Box, Modal, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller, useForm } from 'react-hook-form';
import { paginationRecoil } from '../../../../store/atoms/paginationRecoil';
import { companyListRecoil } from '../../../../store/atoms/companyListRecoil';
import { paginationClient } from '../../../../library/utils/queryClient';
import { searchmodalschema } from '../../../auth/utils/helper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRecoilState } from 'recoil';

const SearchModal = (props) => {
  const [paginationState, setPaginationState] =
    useRecoilState(paginationRecoil);

  const [message, setMessage] = useState(' ');
  const [companyData, setCompanyData] = useRecoilState(companyListRecoil);

  // console.log("PAGINATION STATE", paginationState);

  const { open, setOpen, handleClose, handleOpen, rowBuilder } = props;

  const style = {
    position: 'absolute',
    borderRadius: 2,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',

    boxShadow: 12,
    p: 4,
  };

  const { control, formState, handleSubmit, reset, setValue, getValues } =
    useForm({
      mode: 'onChange',
      defaultValues: paginationState,
      resolver: yupResolver(searchmodalschema),
    });

  const { isValid, dirtyFields, errors } = formState;

  //console.log('ERRORS', errors);

  const onSubmit = async (values) => {
    console.log('VALUES', values);

    try {
      const parsedValues = {
        ...values,
        incorporated_from: String(values.incorporated_from.toISOString()).split(
          'T'
        )[0],
        incorporated_to: String(values.incorporated_to.toISOString()).split(
          'T'
        )[0],
      };
      // console.log("PARSEED: " + JSON.stringify(parsedValues))
      setPaginationState((prev) => ({
        ...prev,
        ...parsedValues,
      }));
      reset(values);
      const response = await paginationClient({
        ...paginationState,
        ...parsedValues,
      });
      if (response.data) {
        setCompanyData(response.data);
        rowBuilder(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    // console.log("after reload",paginationState)
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="mx-1"
    >
      <Box sx={style} className="w-full  lg:w-2/5 md:w-2/5 ">
        <form
          name="contactform"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 mb-3 items-center ">
            <label className="col-span-1">Incorporated From : </label>

            <div className="col-span-2">
              <Controller
                name="incorporated_from"
                defaultValue={paginationState.incorporated_from}
                control={control}
                render={({ field: { onChange, ...restField } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="w-full border-none"
                      label=""
                      value={getValues('incorporated_from')}
                      onChange={(newValue) => {
                        setValue('incorporated_from', newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 mb-5">
            <label className="col-span-1">Incorporated To : </label>

            <div className="col-span-2">
              <Controller
                name="incorporated_to"
                defaultValue={paginationState.incorporated_from}
                control={control}
                render={({ field: { onChange, ...restField } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="w-full"
                      label=""
                      value={getValues('incorporated_to')}
                      onChange={(newValue) => {
                        setValue('incorporated_to', newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 mb-3 gap-0">
            <label className="col-span-1">Name : </label>
            <div className="col-span-2">
              <Controller
                name="company_name"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      type="text"
                      className=" bg-white mt-2 border-none"
                      autoFocus={true}
                      placeholder="Name"
                      error={!!errors.company_name}
                      helpertext={errors?.compapostalname?.message}
                      variant="outlined"
                      fullWidth
                    />
                  </>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 mb-3 gap-0">
            <label className="col-span-1">City : </label>
            <div className="col-span-2">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      type="text"
                      className=" bg-white mt-2 border-none"
                      autoFocus={true}
                      placeholder="City"
                      error={!!errors.city}
                      helpertext={errors?.city?.message}
                      variant="outlined"
                      fullWidth
                    />
                  </>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 mb-3 gap-0">
            <label className="col-span-1">SIC code : </label>
            <div className="col-span-2">
              <Controller
                name="sic_codes"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      type="tel"
                      className=" bg-white mt-2 border-none"
                      autoFocus={true}
                      placeholder="Siccode"
                      error={!!errors.sic_codes}
                      helpertext={errors?.sic_codes?.message}
                      variant="outlined"
                      fullWidth
                    />
                  </>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 mb-3 gap-0 items-center">
            <label className="col-span-1">Postal Code : </label>
            <div className="col-span-2">
              <Controller
                name="postal_code"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      type="text"
                      className=" bg-white mt-2 border-none"
                      autoFocus={true}
                      placeholder="Postal Code"
                      error={!!errors.postal_code}
                      helpertext={errors?.postal_code?.message}
                      variant="outlined"
                      fullWidth
                    />
                  </>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              className="rounded-lg px-3 border-2 border-[#D16F32] text-[#D16F32] cursor-pointer mr-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="headline6 bg-[color:var(--form-button-color)] text-white cursor-pointer my-5 border-none  px-5 rounded-lg"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
        <h3>
          <b>Note :</b> Please enter at least one field
        </h3>
      </Box>
    </Modal>
  );
};

export default SearchModal;
