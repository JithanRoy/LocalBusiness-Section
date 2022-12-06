import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { BsFillTelephoneOutboundFill, BsGlobe2 } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { useRecoilValue } from "recoil";
import { formStateRecoil } from "../../../store/atoms/formStateRecoil";
function Preview() {
  const templateStrings = useRecoilValue(formStateRecoil);
  const [subject, body] = templateStrings.step_three.split(",");
  return (
    <Box>
      <Paper className="w-full p-5" variant="elevation" elevation={6}>
        <PreviewPaper subject={subject} body={body} />
      </Paper>
    </Box>
  );
}

function PreviewPaper({ subject, body }) {
  return (
    <div className="container w-64 lg:w-96 md:w-80 flex-col items-start justify-start">
      <div className="flex-col justify-start">
        <div className="mb-10">
          <Image src="/assets/logo.png" width="80" height="40" alt="" />
        </div>
        <h1>Lorem Up</h1>
        <p>Ipsum justify</p>
        <p>Ipsum jist</p>
        <h1 className="mt-5 mb-5 fw font-semibold">Subject: {subject}</h1>
        <p className="mb-3">Hello John Doe,</p>
        <p className="mb-3">{body}</p>
        <div className="felx-col mt-10">
          <h1 className="font-bold leading-6 text-base mb-5">
            Lorem Ipsum LTD
          </h1>
          <div className="flex justify-between w-1/5">
            <BsFillTelephoneOutboundFill />
            <p className="pb-1">+0154515221223</p>
          </div>
          <div className="flex justify-between w-1/5">
            <FiMail />
            <p className="pb-1">+lorem@gmail.com</p>
          </div>
          <div className="flex justify-between w-1/5">
            <BsGlobe2 />
            <p className="pb-1">www.lorem-ipsum.com</p>
          </div>
          <div className="flex justify-between w-1/5">
            <GoLocation />
            <p className="pb-1">12093 asdijpic</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
