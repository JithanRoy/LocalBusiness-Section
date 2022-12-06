// import StepOne from "../components/AboutUs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import CompanyList from "../../components/Search/CompanyList/CompanyList";
import { apiClientRecoil } from "../../store/atoms/apiClientRecoil";

const StepOne = () => {
    const router = useRouter()
    const apiClientState = useRecoilValue(apiClientRecoil)
    useEffect(() => {
        if(apiClientState.previousRoute !== "/" && apiClientState.previousRoute !== "step-two" ){
            router.push("/")
        }else{
            router.push("/")
        }
    },[apiClientState.previousRoute, router])
    console.log("API client state: " + JSON.stringify(apiClientState))
    return (
        <div>
            <CompanyList data={apiClientState.data} />
        </div>
    );
};

export default StepOne;