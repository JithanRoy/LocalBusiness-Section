import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

import {
  TextField,
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import AuthLayout from "./layout";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import axios from "axios";

import Signin from "./signin";
import Regstepone from "./registration/regstepone";
import Regsteptwo from "./registration/regsteptwo";

const RES_URL = "register";

const Registration = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const steps = ["STEP ONE", "STEP TWO"];

  const onSubmit = (e) => {
    console.log(e);
  };

  const handleSubmit = () => {
    console.log("The button has been submitted.");
  };

  const handleNext = async (data) => {
    console.log(data);
    if (activeStep === steps.length) {
      try {
        const response = await axios.post(
          ` http://tulip-1708405571.eu-west-2.elb.amazonaws.com:8080/api/auth/register`,
          data
        );
        console.log(response);
        if (response.status === 200) {
          enqueueSnackbar(response.data.message, { variant: "success" });
          router.push("/auth/login");
        }
      } catch (err) {
        if (err.response) {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
        console.log(err);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const methods = useForm({
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      phonenumber: "",
      companywebsite: "",
      companytype: "",
      address: "",
      password: "",
      userName: "",
      companyName: "",
      zip: "",
    },
  });

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Regstepone />;
      case 1:
        return <Regsteptwo />;
      default:
        return <Regstepone />;
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-4 justify-between w-full md:w-3/6 mx-auto">
        <h3 className="headline4 text-[18px] lg:text-[24px] md:text-[24px] items-start my-10">
          Register in to Local New Business
        </h3>
        <Box sx={{ width: "100%" }}>
          <Stepper
            activeStep={activeStep}
            className="flex justify-between"
            connector={null}
            sx={{}}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps} className="">
                  <StepLabel sx={{}} className="border-b-4">
                    <div className="">{label}</div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                <Link href="/auth/login">
                  <span className="formbottomlink">Sign in</span>
                </Link>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <FormProvider>
              <form
                name="registrationform"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col px-5 py-10 justify-center items-center gap-4"
              >
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    {getStepContent(activeStep)}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                      className="text-white hover:bg-primaryHover bg-primary cursor-pointer my-5 capitalize p-4 rounded-md font-bold shadow-none hover:shadow-none w-full"
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}
                    <Button
                      onClick={handleNext}
                      className="text-white hover:bg-primaryHover bg-primary cursor-pointer my-5 capitalize p-4 rounded-md font-bold shadow-none hover:shadow-none w-full"
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              </form>
            </FormProvider>
          )}
        </Box>
        <div className="">
          {/* <div className="form-control w-full max-w-sm relative mb-2 self-baseline -mt-4 ">
            <input
              type="checkbox"
              className="appearance h-5 w-5  accent-primary mr-3"
            />
            <span className="headline9 text-dark-84818 my-auto">
              By clicking Create account, I agree that I have read and accepted
              the Terms of Use and Privacy Policy.
            </span>
          </div> */}
          <p className="mx-auto headline8 flex gap-2 items-center">
            Already have an account?
            <Link href="/auth/login">
              <span className="formbottomlink">Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Registration;
