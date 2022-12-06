import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Button } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import authAxios from "../../../library/apis/api-client";
import { useRecoilState } from "recoil";
import { paginationRecoil } from "../../../store/atoms/paginationRecoil";
import { apiClientRecoil } from "../../../store/atoms/apiClientRecoil";
import { resultSearchValidation } from "../../auth/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
const COMPANY_SEARCH = "company/companySearch";

const Banner = props => {
  const router = useRouter();
  const [paginationState, setPaginationState] =
    useRecoilState(paginationRecoil);
  const [apiClientState, setApiClientState] = useRecoilState(apiClientRecoil);
  const { enqueueSnackbar } = useSnackbar();
  const { onShown, isShown, setIsShown, setSearchData } = props;

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const token = Cookies.get("token");

  const onSubmit = async data => {
    try {
      const response = await authAxios.get(`/${COMPANY_SEARCH}`, {
        params: { postal_code: data.postcode, sic_codes: data.sic },
      });
      console.log("response", response.data);
      if (response.status === 200) {
        setPaginationState(prev => ({
          ...prev,
          postal_code: data.postcode,
          sic_codes: data.sic,
          limit: 15,
          total: response.data.noOfDocuments,
        }));
        enqueueSnackbar(response.statusText, { variant: "success" });
        setSearchData(response.data);
        setApiClientState(prev => ({
          ...prev,
          data: response.data,
          previousRoute: "/",
        }));
        router.push("/#Result");
        onShown();
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      }
    }
  };

  return (
    <div className="banner px-10 py-10 lg:px-20 lg:py-20 md:py-20 sm:px-10 h-auto">
      <div className=" max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="headline2 headline2Res  text-white mb-10 xl:w-[890px] lg:w-[890px]  mx-auto">
            We help you connect with new local businesses before the
            competition.
          </h2>
          <p className="headline5 headline5Res text-white lg:w-[712px] md:w-[650px] mx-auto sm:w-[396px] ">
            We help you reach their inboxes, so you can make connections that
            turn into sales. We also offer templates that help you stand out
            from the crowd.
          </p>
        </div>
        <div className="feature flex flex-col justify-center items-center lg:flex-row md:flex-row sm:flex-row text-white mb-10 ">
          <div className="featureclass mb-2">
            <CheckCircleRoundedIcon className="h-6 w-6 text-white" />
            <span className="headline7 ml-4 w-4/5 md:w-auto lg:w-auto">
              Update Every Second
            </span>
          </div>
          <div className="featureclass mb-2">
            <CheckCircleRoundedIcon className="h-6 w-6 text-white" />
            <span className="headline7 ml-4 w-4/5  md:w-auto lg:w-auto">
              30 Days Free Trial
            </span>
          </div>
          <div className="featureclass">
            <CheckCircleRoundedIcon className="h-6 w-6 text-white" />
            <span className="headline7 ml-4 w-4/5  md:w-auto lg:w-auto">
              Unlimited Data
            </span>
          </div>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form mb-20 flex justify-evenly lg:flex-row lg:items-center md:flex-row text-center sm:flex flex-col items-center"
          >
            <div className="form-control w-full max-w-xs relative">
              <label className="headline6 bannerlebleclass headline6Res">
                Search By Postcode
              </label>
              <input
                type="text"
                name="post_code"
                placeholder="Postcode"
                className="bannerinputclass"
                {...register("postcode", {
                  required: {
                    value: true,
                    message: "Postcode is required",
                  },
                  // pattern: {
                  //   value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  //   message: "Provide a valid Postcode", // JS only: <p>error message</p> TS only support string
                  // },
                })}
              />
              <label className="label absolute left-20 bottom-0">
                {errors.postcode?.type === "required" && (
                  <span className=" text-white">
                    {" "}
                    {errors?.postcode?.message}
                  </span>
                )}
                {errors.postcode?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {" "}
                    {errors?.postcode?.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full max-w-xs relative">
              <label className="headline6 bannerlebleclass headline6Res">
                Search by SIC Code
              </label>
              <input
                type="text"
                //disabled
                name="sic_code"
                placeholder="SIC Code"
                className="bannerinputclass"
                {...register("sic", {
                  required: {
                    value: true,
                    message: "SIC Code is required",
                  },
                })}
              />
              <label className="label absolute left-20 bottom-0 ">
                {errors.sic?.type === "required" && (
                  <span className=" text-white"> {errors?.sic?.message}</span>
                )}
                {errors.sic?.type === "pattern" && (
                  <span className="label-text-alt text-red-500 ">
                    {" "}
                    {errors?.sic?.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="headline6 bannerlebleclass headline6Res">
                Click Here to Search Data
              </label>
              <button
                type="submit"
                className=" text-white hover:bg-primaryHover cursor-pointer my-5 p-5 w-full md:w-96 rounded-md shadow-none hover:shadow-none bg-primary uppercase text-base"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
