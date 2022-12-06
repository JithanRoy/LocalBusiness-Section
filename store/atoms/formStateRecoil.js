import { atom } from "recoil";
import { companyListRecoil } from "./companyListRecoil";

export const formStateRecoil = atom({
    key: "formStateRecoil",
    default: {
        step_two: companyListRecoil,
        step_three: "",
        step_four: {},
    }
})
