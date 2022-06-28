import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIGN_OUT } from "../context/AuthContext";
import { auth } from "../firebase/config";
import { useAuthCtx } from "./useAuthCtx";

export default function useLogout() {
    const [isPending, setisPending] = useState(false);
    const { dispatch } = useAuthCtx();
    const navigate = useNavigate();
    const logout = async () => {
        setisPending(true);
        try {
            await auth.signOut();
            dispatch({
                type: SIGN_OUT,
            });
            navigate("/");
        } catch (err) {
            console.log(err.message);
        }
        setisPending(false);
    };
    return { logout, isPending };
}
