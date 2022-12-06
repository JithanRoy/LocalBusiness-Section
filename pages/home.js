import React, {useState} from "react";

import AboutUsSecond from "../components/common/AboutUsSecond/AboutUsSecond";
import Conversation from "../components/common/Conversation/Conversation";

import DashboardSlider from "../components/Home/DashboardSlider/DashboardSlider";
import FindCompanies from "../components/Home/FindCompanies/FindCompanies";
import Footer from "../components/Layout/Footer/Footer";
import HomeAboutUs from "../components/Home/HomeAboutUs/HomeAboutUs";
import HowitWorks from "../components/Home/HowitWorks/HowitWorks";

import Banner from "../components/Home/Banner/Banner";
import Result from "../components/Home/Result/Result";
import Navbar from "../components/Layout/Navbar/Navbar";
import StaticPrintPost from "../components/AboutUs/staticPrintPost";

const Home = () => {
    const [isShown, setIsShown] = useState(false);
    const [searchData, setSearchData ] = useState()

    // function for showing result component or home page componenst based on condition

    const onShown = () => {
        setIsShown((current) => !current);
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (
        <>
            <Navbar/>
            <Banner onShown={onShown} isShown={isShown} setIsShown={setIsShown} setSearchData={setSearchData}/>
            {isShown ? (
                <>
                    <Result onShown={onShown} isShown={isShown} setIsShown={setIsShown} searchData={searchData}/>
                </>
            ) : (
                <>
                    <FindCompanies/>
                    <StaticPrintPost/>
                    <DashboardSlider/>
                    <HowitWorks/>
                    <HomeAboutUs/>
                    <AboutUsSecond/>
                    <Conversation/>
                </>
            )}

            <Footer/>
        </>
    );
};

export default Home;
