// import StepOne from "../components/AboutUs";
import { useRouter } from "next/router";
const StepTwo = () => {
    const router = useRouter();
    console.log("ROUTE HISTORY", router.pathname)
    return (
        <div>
            <>STEP Two</>
        </div>
    );
};

export default StepTwo;