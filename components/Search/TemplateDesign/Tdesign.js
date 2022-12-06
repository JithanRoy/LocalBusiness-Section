import { Button } from "@mui/material";
import React from "react";
import Image from "next/image";
import NewTemplate from "../../../public/assets/NewTemplate.png";

const Tdesign = props => {
  const { ondatasubmit } = props;
  return (
    <div className="px-5 py-10 shadow-md lg:px-20 relative">
      <div>
        <h5 className="headline6 mb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h5>
      </div>
      <div className="">
        <Image
          src={NewTemplate}
          alt="payment method"
          className="cursor-pointer duration-700 hover:scale-125"
        />
      </div>

      <div className="absolute right-0 top-[100%]">
        <button
          className="headline6 bg-[color:var(--form-button-color)] text-white cursor-pointer my-5 border-none py-2 px-5 rounded-lg"
          onClick={() => ondatasubmit("printandpostnext")}
        >
          Continue To Next Step
        </button>
      </div>
    </div>
  );
};

export default Tdesign;
