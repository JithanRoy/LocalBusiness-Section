// import StepOne from "../components/AboutUs";
import { useRouter } from "next/router";
const StepThree = () => {
    const router = useRouter();
    console.log("ROUTE HISTORY", router.pathname)
    return (
        <div>
            <>STEP THREE</>
        </div>
    );
};

export default StepThree;