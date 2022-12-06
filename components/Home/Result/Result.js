import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TotalCompany from "../../Search/TotalCompnay/TotalCompany";

import CompanyList from "../../Search/CompanyList/CompanyList";
import SelectOption from "../../Search/SelectOption/SelectOption";

import Tdesign from "../../Search/TemplateDesign/Tdesign";
import CompnayListSender from "../../Search/CompanyListSender/CompnayListSender";
import Emailsender from "../../Search/Emailsender/Email";
import CListSenderTemplate from "../../Search/CListSenderTemplate/CListSenderTemplate";
import PaymentOption from "../../Search/PaymentOption/PaymentOption";
import PaymentComplete from "../../Search/PaymentComplete/PaymentComplete";

const steps = ["Number of Company", "Company List", "Select Option", "Payment"];

const Result = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [isShown, setIsShown] = React.useState(false);
  const [dataT, setData] = React.useState("");
  const [active, setActive] = React.useState(true);
  const [email, setEmail] = React.useState();

  console.log(dataT);

  const { onShown, searchData } = props;

  // receiving data for changing component in select option step

  const ondatasubmit = (data) => {
    setActive(true);
    if (data === "next") {
      console.log(data);
      setData(data);
    } else if (data === "email") {
      console.log(data);
      setData(data);
      setActive((current) => !current);
    } else if (data === "displaytemplate") {
      console.log(data);

      setData(data);
    } else if (data === "emailpayment") {
      console.log(data);
      setData(data);
      setActive((current) => !current);
    } else if (data === "clistsenderpayment") {
      console.log(data);
      setData(data);
      setActive((current) => !current);
    } else if (data === "downloadpayment") {
      console.log(data);
      setData(data);
      setActive((current) => !current);
    } else {
      setData(data);
      setIsShown((current) => !current);
    }
  };

  // stepper step functionality

  const isStepActive = (step) => {
    return step === 0;
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  console.log(activeStep);

  const handleBack = () => {
    if (dataT === "emailpayment") {
      ondatasubmit("email");
      setActiveStep(activeStep - 1);
    } else if (dataT === "email") {
      ondatasubmit("");
    } else if (dataT === "printandpostnext") {
      ondatasubmit("printandpost");
    } else if (dataT === "downloadpayment") {
      ondatasubmit("");
      setActiveStep(activeStep - 1);
    } else if (dataT === "printandpost") {
      ondatasubmit("");
    } else if (dataT === "clistsenderpayment") {
      ondatasubmit("displaytemplate");
      setActiveStep(activeStep - 1);
    } else if (dataT === "displaytemplate") {
      ondatasubmit("printandpostnext");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  // Reseting Stepper back to default state

  const handleReset = () => {
    setActiveStep(0);
  };

  // function for switching component in eact stepper

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <TotalCompany data={searchData?.noOfDocuments} />;

      case 1:
        return <CompanyList data={searchData} />;
      case 2:
        if (dataT == "printandpost") {
          return <Tdesign ondatasubmit={ondatasubmit} />;
        } else if (dataT == "printandpostnext") {
          return <CompnayListSender ondatasubmit={ondatasubmit} />;
        } else if (dataT == "email") {
          return <Emailsender ondatasubmit={ondatasubmit} />;
        } else if (dataT == "displaytemplate") {
          return (
            <CListSenderTemplate ondatasubmit={ondatasubmit} data={email} />
          );
        } else if (
          dataT == "emailpayment" ||
          dataT === "downloadpayment" ||
          dataT === "clistsenderpayment"
        ) {
          setActiveStep(activeStep + 1);
        } else {
          return (
            <SelectOption
              setActive={setActive}
              ondatasubmit={ondatasubmit}
              isShown={isShown}
              setIsShown={setIsShown}
            />
          );
        }

      case 3:
        return <PaymentOption />;

      default:
        return "Payment Options Coming Soon";
    }
  }

  return (
    <div className="px-5 pt-20 lg:px-20  max-w-7xl mx-auto" id="Result">
      <Box sx={{ width: "100%" }}>
        <Stepper
          activeStep={activeStep}
          className="grid justify-items-center grid-cols-4 "
          connector={null}
          sx={{
            "& .css-qivjh0-MuiStepLabel-label.Mui-active": {
              color: "#D16F32",
            },
            "& .css-1bw0nnu-MuiStep-root": {
              padding: "20px 0px ",
              flexShrink: 1,
            },
          }}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption"></Typography>;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step
                key={index}
                {...stepProps}
                className="py-5 px-0 lg:px-5 border-solid border-2 w-full "
              >
                <StepLabel
                  {...labelProps}
                  className="ml-0 lg:ml-[60px] flex-col text-center lg:flex-row w-full justify-center"
                >
                  <span className="text-[8px] sm:text-[12px] lg:text-[14px] flex justify-center lg:justify-start mt-3 lg:mt-0">
                    {label}
                  </span>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <div className="mt-5 ">
            <Typography sx={{ mt: 2, mb: 1 }}>
              <PaymentComplete onShown={onShown} />
            </Typography>
            <Box>
              <Box />
            </Box>
          </div>
        ) : (
          <div className="">
            <Typography sx={{ mt: 2, mb: 1 }}>
              {getStepContent(activeStep)}
              {/* {activeStep + 1} */}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                p: 2,
                justifyContent: "space-between",
              }}
            >
              {activeStep === 0 ? (
                <button
                  color="inherit"
                  className="rounded px-3 py-2 border-2 border-[#D16F32] text-[#D16F32] cursor-pointer"
                  onClick={onShown}
                  sx={{ mr: 1 }}
                >
                  Back
                </button>
              ) : (
                <button
                  color="inherit"
                  className="rounded px-3 py-2 border-2 border-[#D16F32] text-[#D16F32] cursor-pointer"
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </button>
              )}

              <Box />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}

              {dataT === "email" || (activeStep === 2 && active) ? (
                <span></span>
              ) : (
                <button
                  onClick={handleNext}
                  className="headline6 bg-[color:var(--form-button-color)] text-white cursor-pointer my-5 border-none py-2 px-5 rounded-lg"
                >
                  {activeStep === steps.length - 1
                    ? "Finish"
                    : "Continue To Next Step"}
                </button>
              )}
            </Box>
          </div>
        )}
      </Box>
    </div>
  );
};

export default Result;
