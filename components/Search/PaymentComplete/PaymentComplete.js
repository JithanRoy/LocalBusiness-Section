import Image from "next/image";
import Link from "next/link";
import React from "react";

const PaymentComplete = ({ onShown }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <section className="">
        <div className="shadow-lg py-20 text-center">
          <Image
            src="/assets/PaymentSucces.svg"
            width="160"
            height="160"
            alt="payment completed"
            className="mx-auto mb-5"
          />
          <h2 className="Tagline lg:text-[40px] md:text-[30px] sm:text-[20px] my-[30px]">
            Payment Successfully Completed
          </h2>
          <p className="headline6 pb-[60px] text-[12px] lg:text-[18px] md:text-[18px] text-[color:var(--Black-three)]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet
            laoreet egestas.
          </p>
          <Link href="">
            <button
              className="w-[242px] py-4 rounded-lg headline6 my-5 text-center bg-[color:var(--primary1-color)] text-white cursor-pointer"
              onClick={onShown}
            >
              Back Home
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PaymentComplete;
