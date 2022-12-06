import React from "react";
import {AiOutlineMail, AiOutlinePrinter} from "react-icons/ai";
import {BiDownload} from "react-icons/bi";

const StaticPrintPost = () => {
    return (<div className="lg:container w-full md:max-w-7xl mx-auto px-5 md:px-20">
            <div className="lg:px-10 px-5 md:px-10 w-full md:w-3/5 mx-auto">
                <div className="text-3xl font-semibold text-center  mb-5 ">
                    Lorem ipsum dolor sit amet.
                </div>
                <div className="headline6 text-base text-dark-202020 text-opacity-60 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique
                    odio nam vel. Euismod convallis condimentum facilisis tincidunt
                    tristique. Varius at pretium vitae vestibulum. Turpis donec lacus
                    tincidunt quis enim.
                </div>
            </div>
            <div className="flex flex-col md:w-4/6 mx-auto w-full  justify-center items-center lg:flex-row md:flex-row mt-10 max-w-full px-10 lg:px-0 md:px-0">
                <div className="border-2 border-solid lg:mx-2 md:mx-2 mt-5 w-full lg:w-1/4 md:w-2/4 sm:w-2/4 text-center rounded-md bg-amber-600 bg-opacity-5 border-amber-600 text-amber-600">
                    <button className=" bg-grey-light hover:bg-grey text-grey-darkest font-bold py-4 px-4 rounded inline-flex items-center ">
                        <AiOutlinePrinter className="text-[25px] mr-5 "/>
                        <span className="headline7 text-[14px] lg:text-[16px] sm:text-[14px] w-1/3 md:w-auto lg:w-auto">
                             Print and Post
                        </span>
                    </button>
                </div>
                <div
                    className="border-2 border-solid lg:mx-2 md:mx-2 mt-5 w-full lg:w-1/4 md:w-2/4 sm:w-2/4 text-center rounded-md hover:bg-amber-600 hover:bg-opacity-5 hover:border-amber-600 hover:text-amber-600">
                    <button
                        className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-4 px-4 rounded inline-flex items-center "
                    >
                        <AiOutlineMail className="text-[25px] mr-5 "/>
                        <span className="headline7 text-[14px] lg:text-[16px] sm:text-[14px] w-1/3 md:w-auto lg:w-auto">
              Email
            </span>
                    </button>
                </div>

                <div
                    className="border-2 border-solid lg:mx-2 md:mx-2 mt-5 w-full lg:w-1/4 md:w-2/4 sm:w-2/4 rounded-md hover:bg-amber-600 hover:bg-opacity-5 text-center hover:border-amber-600 hover:text-amber-600">
                    <button
                        className="bg-grey-light hover:bg-grey text-grey-darkest font-bold p-4 inline-flex items-center ">
                        <BiDownload className="text-[25px] mr-5 "/>
                        <span className="headline7 text-[14px] lg:text-[16px] sm:text-[14px] w-1/3 md:w-auto lg:w-auto">
              Download
            </span>
                    </button>
                </div>
            </div>
        </div>);
};

export default StaticPrintPost;
