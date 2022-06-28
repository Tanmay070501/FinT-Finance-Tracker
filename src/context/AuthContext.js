import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

const AuthCtx = createContext();

export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const SIGN_OUT = "SIGN_OUT";
export const AUTH_IS_READY = "AUTH_IS_READY";

function authReducer(state, action) {
    if (action.type === SIGN_IN) {
        return {
            ...state,
            user: action.user,
        };
    }
    if (action.type === SIGN_UP) {
        return {
            ...state,
            user: action.user,
        };
    }
    if (action.type === SIGN_OUT) {
        return {
            ...state,
            user: null,
        };
    }
    if (action.type === AUTH_IS_READY) {
        return {
            ...state,
            user: action.user,
            isAuthReady: true,
        };
    }
    return state;
}

export function AuthCtxProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthReady: false,
    });
    //value to be provided by AuthCtxProvider
    const value = {
        ...state,
        dispatch,
    };

    //useEffect for auth change
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            // console.log("ran");
            dispatch({
                type: AUTH_IS_READY,
                user: user,
            });
            unsubscribe();
        });
    }, []);
    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export default AuthCtx;
