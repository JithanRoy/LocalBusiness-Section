import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer text-gray-600 body-font  bottom-0 w-full">
      <div className="container px-10 py-24 lg:px-20 md:px-20 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="xl:w-64 lg:w-64 md:w-64 flex-shrink-0 md:mx-0 md:text-left sm:mx-0 sm:w-full">
          <a className="flex title-font justify-start font-medium xl:items-center md:justify-start text-gray-900 sm:justify-start">
            <img
              className="ml-3 text-xl"
              src="/assets/logo.png"
              width="120"
              height=""
              alt="logo"
            />
          </a>
          <p className="mt-2 text-sm text-gray-500">
            Be the first to access new companies contact details with New Start
            Data. Be the first to access new companies contact details with New
            Start Data.
          </p>
        </div>
        <div className="w-full flex justify-between md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left sm:pl-0">
          <div className="lg:w-1/4 md:w-1/2 w-full xl:px-4 lg:px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Company
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Start Seacrh</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">About</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Contact</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Company
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Start Seacrh</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">About</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Contact</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Company
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Start Seacrh</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">About</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Contact</a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="py-10 px-10 text-center">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </footer>
  );
};

export default Footer;
