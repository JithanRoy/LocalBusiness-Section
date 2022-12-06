import React from "react";
import { TextField } from "@mui/material";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/style.css";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { emailListRecoil } from "../../../store/atoms/emailListRecoil";
import { serviceRequestClient } from "../../../library/utils/queryClient";
import { companyListRecoil } from "../../../store/atoms/companyListRecoil";

const Emailsender = ({ ondatasubmit }) => {
  const fixedOptions = [];
  const [emailRecoilState, setEmailRecoilState] =
    useRecoilState(emailListRecoil);
  const [email, setEmail] = React.useState([]);
  const [emails, setEmails] = React.useState([]);
  const [emailBody, setEmailBody] = React.useState([]);
  const companyList = useRecoilValue(companyListRecoil);
  // Use emails

  const handleEmailInput = async e => {
    e.preventDefault();
    try {
      const payload = {
        companyNumberList: companyList,
        toEmailList: emails,
        service_type: "EMAIL_SERVICE",
      };
      const response = await serviceRequestClient(payload);
      if (response.status === 200) {
        ondatasubmit("emailpayment");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <section className="text-gray-600 body-font ">
      <div className="container shadow-lg rounded-lg mx-auto  lg:px-8 py-12 md:px-4 sm:px-2">
        <div className="w-full lg:px-8 md:px-5 px-5  ">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Lorem ipsum dolor sit amet consectetur.
          </h1>
          <p className="leading-relaxed mt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo
            ab possimus tempora assumenda deleniti, dignissimos, ut ad velit
            atque quisquam nihil asperiores cupiditate cum enim nisi, eveniet
            et. Cum molestias natus dicta quod excepturi, consequatur non.
          </p>
        </div>

        <form>
          <div className="lg:py-24 lg:px-32 md: sm:w-full p-2 relative">
            <div className="px-2 lg:px-10 py-10 shadow-lg">
              <div className="flex flex-col gap-7">
                <div>
                  <div className="mb-1">Email List</div>
                  <ReactMultiEmail
                    placeholder="Input your Email Address"
                    emails={email}
                    label="Emails"
                    onChange={e => {
                      setEmails(e);
                    }}
                    getLabel={(email, index, removeEmail) => {
                      return (
                        <div data-tag key={index}>
                          {email}
                          <span
                            data-tag-handle
                            onClick={() => removeEmail(index)}
                          >
                            ×
                          </span>
                        </div>
                      );
                    }}
                  />
                </div>
                {/* <TextField fullWidth multiline rows={7} label="Email body" id="fullWidth" onChange={(e) => {
                setEmailBody(e.target.value)
              }} /> */}
              </div>
            </div>
            <div className="absolute right-0 top-[130%] lg:top-[115%]">
              {/* <button
                className="rounded px-3 py-2 border-2 border-[#D16F32] text-[#D16F32] cursor-pointer mt-5"
                onClick={() => ondatasubmit('')}
              >
                Cancel
              </button> */}
              <button
                className="headline6 bg-[color:var(--form-button-color)] text-white cursor-pointer my-5 border-none py-2 px-5 rounded-lg"
                onClick={handleEmailInput}
                disabled={!emails.length > 0 && !emailBody.length > 0}
              >
                Continue To Next Step
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Emailsender;
