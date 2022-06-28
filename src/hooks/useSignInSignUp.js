import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIGN_IN, SIGN_UP } from "../context/AuthContext";
import { auth } from "../firebase/config";
import { useAuthCtx } from "./useAuthCtx";

export default function useSignInSignUp() {
    const [isPending, setisPending] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthCtx();
    const navigate = useNavigate();
    const register = async (email, password) => {
        setisPending(true);
        setError(null);
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            //DISPATCH SIGN UP
            dispatch({
                type: SIGN_UP,
                user: response.user,
            });
            setError(null);
            //NAVIGATE TO HOME
            navigate("/");
        } catch (err) {
            let errMessage = "";
            switch (err.code) {
                case "auth/email-already-in-use":
                    errMessage = `The email ${email} is already in use`;
                    break;
                case "auth/weak-password":
                    errMessage =
                        "Weak Password! (password length should not be less than 6)";
                    break;
                case "auth/invalid-email":
                    errMessage = "Invalid email";
                    break;
                default:
                    errMessage = err.message;
            }
            setError(errMessage);
        }
        setisPending(false);
    };

    const login = async (email, password) => {
        setisPending(true);
        setError(null);
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            //DISPATCH SIGN IN USER
            dispatch({
                type: SIGN_IN,
                user: response.user,
            });
            setError(null);
            //NAVIGATE TO HOME
            navigate("/");
        } catch (err) {
            let errMessage = "";
            switch (err.code) {
                case "auth/invalid-email":
                    errMessage = "Invalid email";
                    break;
                case "auth/user-disabled":
                    errMessage = "User Disabled";
                    break;
                case "auth/user-not-found":
                    errMessage = "User Not Found";
                    break;
                case "auth/wrong-password":
                    errMessage = "Wrong Password";
                    break;
                default:
                    errMessage = err.message;
            }
            setError(errMessage);
        }
        setisPending(false);
    };
    return { register, login, isPending, error };
}
