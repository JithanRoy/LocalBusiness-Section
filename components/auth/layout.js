import React from "react";
import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-6 h-screen">
        <div className="left-div col-span-1  md:col-span-2 hidden md:block">
          <div className="flex flex-col items-start justify-between h-full">
            <div className="p-10 lg:p-16 cursor-pointer">
              <Link href="/home">
                <Image
                  src="/assets/logo.png"
                  width="120"
                  height="50"
                  alt="logo"
                />
              </Link>
            </div>
            <div>
              <div className="headline2 text-[20px] lg:text-[32px] md:text-[32px] text-white px-10 lg:px-16">
                Do you want to grow <br />
                your business? <br />
                Join us now.
              </div>
              <div className="headline6 text-[12px] lg:text-[18px] md:text-[18px] text-white px-10 lg:px-16 my-10">
                Creating Brands, Growing business’s and crafting unique
                experiences for customers all around the world.
              </div>
            </div>
          </div>
        </div>
        <div className="right-div bg-yellow-200 col-span-1 md:col-span-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
