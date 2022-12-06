import { AiOutlinePrinter, AiOutlineMail } from "react-icons/ai";
import { BiDownload } from "react-icons/bi";
import { useRecoilValue } from "recoil";
import { serviceRequestClient } from "../../../library/utils/queryClient";
import { companyListRecoil } from "../../../store/atoms/companyListRecoil";

const PrintandPost = props => {
  const { ondatasubmit, isShown, setIsShown } = props;
  const companyList = useRecoilValue(companyListRecoil);
  console.log(companyList);

  const handleDownload = async () => {
    try {
      const payload = {
        companyNumberList: companyList,
        service_type: "DOWNLOAD_SERVICE",
      };
      const response = await serviceRequestClient(payload);
      if (response.status === 200) {
        ondatasubmit("downloadpayment");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  return (
    <div className="lg:container max-w-7xl mx-auto">
      <div className="lg:px-10 px-5 md:px-10 md:mx-2">
        <h2 className="headline3 text-[17px] mb-5 ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h2>
        <p className="headline6 text-[14px] text-[#202020ba]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique
          odio nam vel. Euismod convallis condimentum facilisis tincidunt
          tristique. Varius at pretium vitae vestibulum. Turpis donec lacus
          tincidunt quis enim.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center lg:flex-row md:flex-row mt-10 max-w-full px-10 lg:px-0 md:px-0">
        <div className="border-2 border-solid lg:mx-2 md:mx-2 mt-5 w-full lg:w-1/4 md:w-2/4 sm:w-2/4 text-center rounded-md hover:bg-amber-600 hover:bg-opacity-5 hover:border-amber-600 hover:text-amber-600">
          <button
            className=" bg-grey-light hover:bg-grey text-grey-darkest font-bold py-6 sm:py-12 px-4 rounded inline-flex items-center "
            onClick={() => ondatasubmit("printandpost")}
          >
            <AiOutlinePrinter className="text-[25px] mr-5 " />
            <span className="headline7 text-[14px] lg:text-[16px] sm:text-[14px] w-1/3 md:w-auto lg:w-auto">
              Print and Post
            </span>
          </button>
        </div>

        <div className="border-2 border-solid lg:mx-2 md:mx-2 mt-5 w-full lg:w-1/4 md:w-2/4 sm:w-2/4 text-center rounded-md hover:bg-amber-600 hover:bg-opacity-5 hover:border-amber-600 hover:text-amber-600">
          <button
            className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-6 sm:py-12 px-4 rounded inline-flex items-center "
            onClick={() => ondatasubmit("email")}
          >
            <AiOutlineMail className="text-[25px] mr-5 " />
            <span className="headline7 text-[14px] lg:text-[16px] sm:text-[14px] w-1/3 md:w-auto lg:w-auto">
              Email
            </span>
          </button>
        </div>

        <div className="border-2 border-solid lg:mx-2 md:mx-2 mt-5 w-full lg:w-1/4 md:w-2/4 sm:w-2/4 rounded-md hover:bg-amber-600 hover:bg-opacity-5 text-center hover:border-amber-600 hover:text-amber-600">
          <button
            className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-6 sm:py-12   px-4 inline-flex items-center "
            onClick={handleDownload}
          >
            <BiDownload className="text-[25px] mr-5 " />
            <span className="headline7 text-[14px] lg:text-[16px] sm:text-[14px] w-1/3 md:w-auto lg:w-auto">
              Download
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintandPost;
