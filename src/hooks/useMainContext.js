import { MainContext } from "../context/MainContext";
import { useContext } from "react";

export const useMainContext = () => {
    const context = useContext(MainContext)

    return context
}