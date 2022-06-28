import { useContext } from "react";
import AuthCtx from "../context/AuthContext";

export const useAuthCtx = () => {
    const context = useContext(AuthCtx);
    if (!context) {
        throw new Error("No context provided");
    }
    return context;
};
