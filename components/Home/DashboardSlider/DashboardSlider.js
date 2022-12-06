import Image from "next/image";
import Carousel from "react-grid-carousel";

const DashboardSlider = () => {
  return (
    <div className="lg:px-[200px] md:px-[150px] mx-auto">
      <Carousel cols={1} rows={1} gap={10} loop>
        <Carousel.Item className="w-full">
          <div className="flex justify-center items-center w-full">
            <Image
              src="/assets/Laptop.png"
              width="700"
              height="500"
              alt="laptop pic"
            />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default DashboardSlider;
