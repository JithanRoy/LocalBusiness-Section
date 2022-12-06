import { Button, TextareaAutosize, TextField } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import logotext from "../../../public/assets/logotext.png";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TextEditor from "../TextEditor/TextEditor";
import {
  userInfoClient,
  fileUploadClient,
} from "../../../library/utils/queryClient";
import { formStateRecoil } from "../../../store/atoms/formStateRecoil";
import { useRecoilState } from "recoil";

const CompnayListSender = ({ ondatasubmit }) => {
  const defaultValues = { subject: "" };

  const [clientId, setClientId] = useState(null);
  const [emailState, setEmailState] = useState({
    subject: "",
    body: "",
  });
  const [templateString, setTemplateString] = useRecoilState(formStateRecoil);
  const { control, formState, handleSubmit, reset, getValues, setValue } =
    useForm({
      mode: "onChange",
      defaultValues: emailState,
    });
  const [image, setImage] = useState(null);

  console.log("CLIENT ID: " + clientId);
  console.log("Image", image);

  const uploadToClient = event => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
    }
  };

  useEffect(() => {
    const fetchClient = async () => {
      const client = await userInfoClient();
      setClientId(client.data._id);
    };
    try {
      fetchClient();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleTemplateText = data => {
    // console.log("EMAIL: " + JSON.stringify(data))
    const emailTemplate = `${data.subject}` + `,${data.body}`;
    setTemplateString(prev => ({
      ...prev,
      step_three: emailTemplate,
    }));
    ondatasubmit("displaytemplate");
  };

  useEffect(() => {
    if (image && clientId) {
      try {
        const body = new FormData();
        body.append("file", image);
        console.log();
        fileUploadClient(clientId, body);
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return;
    }
  }, [clientId, image]);

  const { isValid, dirtyFields, errors } = formState;
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(handleTemplateText)}>
      <div className="shadow-lg px-2 lg:px-6 py-4 rounded bg-transparent relative">
        <div className="border-white shadow-lg m-[2px] p-8">
          <h3 className="taglineRes font-bold mb-5 text-[#797979]">
            Details Section
          </h3>

          <div className="items-center justify-center">
            <div className="col-span-1">
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Subject"
                    type="text"
                    className="bg-white"
                    // value={emailState.subject}
                    autoFocus={true}
                    // onChange={(e) => setEmailState((state) => ({ ...state, subject: e.target.value }))}
                    placeholder="Subject"
                    helpertext={errors?.name?.message}
                    variant="outlined"
                    error={!!errors?.name}
                    required
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name="body"
                control={control}
                render={({ field }) => (
                  <>
                    <TextareaAutosize
                      {...field}
                      // value={emailState.body}

                      // onChange={(e) => setEmailState((state) => ({ ...state, body: e.target.value }))}

                      type="text"
                      minRows={14}
                      className="bg-white rounded w-full border-2 mt-2 py-2 px-2"
                      placeholder="Write your email..."
                      variant="outlined"
                    />
                  </>
                )}
              />
            </div>
          </div>
        </div>

        <div className="border shadow-lg m-[2px] mt-4 sm:px-8 px-3 sm:py-8 py-8 sm:flex sm:flex-row text-center rounded">
          <div className="">
            <h3 className="taglineRes font-bold mb-5 text-[#797979]">
              Sender Information
            </h3>
            <div>
              <Image src={logotext} alt="company logo" className="w-full" />
            </div>
            <div className="my-5">
              <label
                className="text-white hover:bg-primaryHover bg-primary cursor-pointer capitalize px-2 py-2 rounded font-semibold shadow-none hover:shadow-none text-sm"
                for="avatar"
              >
                Upload Logo
              </label>
              <input
                className="hidden"
                type="file"
                id="avatar"
                name="file"
                accept="image/png, image/jpeg"
                onChange={uploadToClient}
              />
            </div>
          </div>

          <div className="sm:mt-14 mt-8">
            <h3 className="font-bold text-[15px] lg:text-[20px] md:text-[18px] sm:text-[18px] text-left">
              RUNNINGWELLCO LTD
            </h3>
            <div className="flex mt-2">
              <div>
                <LocalPhoneOutlinedIcon fontSize="small" />
              </div>
              <div className="pl-8">+44 1244 5556</div>
            </div>

            <div className="flex mt-2">
              <div>
                <EmailOutlinedIcon fontSize="small" />
              </div>
              <div className="pl-8">davidbarata@example.com</div>
            </div>

            <div className="flex mt-2">
              <div>
                <LanguageOutlinedIcon fontSize="small" />
              </div>
              <div className="pl-8 text-[#23A3FF] underline">
                davidbarata@example.com
              </div>
            </div>

            <div className="flex mt-2">
              <div>
                <LocationOnOutlinedIcon fontSize="small" />
              </div>
              <div className="pl-8 text-left">
                1249 Uttor Badda, Manchester, NK, 08855, Bangladesh.
              </div>
            </div>
          </div>
        </div>

        <div className="m-5">
          <div className="absolute right-0 top-[100%]">
            <button
              type="submit"
              value="Send"
              className="headline6 bg-[color:var(--form-button-color)] text-white cursor-pointer my-5 border-none py-2 px-5 rounded-lg"
            >
              Continue To Next Step
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CompnayListSender;
