import { useContext } from "react";
import { AppContext } from "../AppContext";
import { IAppContext } from "../interfaces/IAppContext";

export const useApp = (): IAppContext => {
    return useContext(AppContext);
}