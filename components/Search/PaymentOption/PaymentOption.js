import { Divider, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import Paypal from "../../../public/assets/PayPal.png";
import MasterCard from "../../../public/assets/MasterCard.png";
import Visa from "../../../public/assets/Visa.png";
import PercentIcon from "@mui/icons-material/Percent";
import AddIcon from "@mui/icons-material/Add";
import { useRecoilValue } from "recoil";
import { emailListRecoil } from "../../../store/atoms/emailListRecoil";

const PaymentOption = () => {
  const defaultValues = {
    nameofcardholder: "",
    cardnumber: "",
    expiration: "",
    cvv: "",
  };
  const email = useRecoilValue(emailListRecoil)
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const { isValid, dirtyFields, errors } = formState;
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Payment method section */}
      <div className="grid grid-cols-5 gap-5 my-10  justify-between ">
        <div className="text-left col-span-5 lg:col-span-3 shadow-xl p-5 lg:p-8 md:p-8 xl:p-8">
          <h2 className="headline3 text-[#202020ba] text-[17px]">
            Please Select Your Payment Method
          </h2>
          <div className="flex py-3">
            <span className="border p-2 rounded-xl  hover:border-orange-600 flex items-center md:p-5 lg:p-5 xl:p-5">
              <Image src={Paypal} alt="payment method" className="" />
            </span>
            <span className="mx-2 border border-[#84818A]-600 p-2 rounded-xl hover:border-orange-600 flex items-center lg:mx-5 md:mx-5 xl:mx-5 md:p-5 lg:p-5 xl:p-5">
              <Image src={MasterCard} alt="payment method" className="" />
            </span>
            <span className="border border-[#84818A]-600 p-2 rounded-xl hover:border-orange-600 flex items-center md:p-5 lg:p-5 xl:p-5">
              <Image src={Visa} alt="payment method" className="" />
            </span>
            <div className="mx-2 border border-[#84818A]-600 p-2 rounded-xl flex items-center md:p-5 lg:p-5 xl:p-5 hover:border-orange-600 hover:text-orange-600 lg:mx-5 md:mx-5 xl:mx-5">
              <span className="mr-2">
                <AddIcon />
              </span>
              <button>Add Card</button>
            </div>
          </div>

          <form
            name="paymentmethoddetails"
            noValidate
            className="payment-option-form text left py-5"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-5 ">
              {/*Cardholder Name*/}
              <Controller
                name="nameofcardholder"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    if (value === "") {
                      return "please enter cardholder name";
                    }
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    type="name"
                    className="bg-white rounded-2xl"
                    autofocus={true}
                    placeholder="Name"
                    error={!!errors.name}
                    helpertext={errors?.name?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
              {/*Card Number*/}
              <Controller
                name="cardnumber"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    if (value === "") {
                      return "please enter card number";
                    }
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Card Number"
                    type="tel"
                    className="bg-white rounded"
                    autofocus={true}
                    placeholder="Card Number"
                    error={!!errors.cardnumber}
                    helpertext={errors?.cardnumber?.message}
                    variant="outlined"
                    required
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Image
                            src={MasterCard}
                            width="45"
                            height="30"
                            alt="cardimage"
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {/*Expire Date*/}
                <div className="grid grid-cols-1">
                  <Controller
                    name="expiration"
                    control={control}
                    rules={{
                      required: true,
                      validate: (value) => {
                        if (value === "") {
                          return "please enter month year";
                        }
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label=""
                        type="date"
                        className="bg-white rounded"
                        autofocus={true}
                        placeholder="expiration"
                        error={!!errors.date}
                        helpertext={errors?.date?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </div>
                {/*CVV*/}
                <div className="grid grid-cols-1">
                  <Controller
                    name="cvv"
                    control={control}
                    rules={{
                      required: true,
                      validate: (value) => {
                        if (value === "") {
                          return "please enter cvv";
                        }
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="CVV"
                        type="number"
                        className="bg-white rounded"
                        autofocus={true}
                        placeholder="CVV"
                        error={!!errors.cvv}
                        helpertext={errors?.cvv?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-5 lg:col-span-2 shadow-lg p-8 text-left">
          <h2 className="headline3 text-[#202020ba] text-[17px]">Your Order</h2>
          <p className="headline9 text-[13px] text-[#20202082]  pt-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            integer convallis neque auctor nunc.
          </p>
          <div className="payment-option-details ">
            <div className="flex justify-between py-5">
              <p className="headline7 text-[15px] text-[#202020e5]">
                Merchant name
              </p>
              <p className="headline3 text-[15px] text-[#202020e5]">
                Data Business Group
              </p>
            </div>
            <div className="flex justify-between py-5">
              <p className="headline7 text-[16px] text-[#202020e5]">
                500 Print & Post
              </p>
              <p className="headline3 text-[16px] text-[#202020e5]">£23</p>
            </div>
            <div className="flex justify-between py-5">
              <p className="headline7 text-[16px] text-[#202020e5]">Currency</p>
              <p className="headline3 text-[16px] text-[#202020e5]">POUND</p>
            </div>
            <Divider />
            <div className="pt-5  color-[#D9D9D9]"></div>
            <div className="flex justify-between py-2">
              <p className="headline7 text-[16px] text-[#202020e5]">
                Net Price
              </p>
              <p className="headline3 text-[16px] text-[#202020e5]">£23</p>
            </div>
            <div className="flex justify-between py-5">
              <p className="headline7 text-[16px] text-[#202020e5]">VAT</p>
              <p className="headline3 text-[16px] text-[#202020e5]">£4</p>
            </div>
            <Divider />
            <div className="pt-5  color-[#D9D9D9]"></div>
            <div className="flex justify-between pt-3">
              <p className="headline2 text-[16px] text-[#202020d6]">
                Total Price pm
              </p>
              <p className="headline2 text-[16px] text-[#202020d6]">£27</p>
            </div>
            <div className="py-4 bg-transparent">
              <div className="flex justify-between p-4  rounded-lg bg-[#f0f8ff]">
                <p className="headline5 text-[#3294D1]">
                  Your total saving in this order
                </p>
                <p className="headline5 text-[#3294D1]">£1.50</p>
              </div>
            </div>
            <div className="flex justify-between pt-3">
              <div className="payment-option-coupun-code">
                <Controller
                  name="Coupon Code"
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) => {
                      if (value === "") {
                        return "please enter Coupon Code";
                      }
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Coupon Code"
                      type="tel"
                      className="bg-white rounded"
                      autofocus={true}
                      placeholder="Coupon Code"
                      error={!!errors.cvv}
                      helpertext={errors?.cvv?.message}
                      variant="outlined"
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PercentIcon></PercentIcon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </div>

              <button
                type="submit"
                className="rounded-lg  border-2 border-[#D16F32] text-[#D16F32] cursor-pointer py-3 ml-1 sm:mx-0 md:ml-1 lg:ml-1 xl:mx-0 px-6 "
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOption;
