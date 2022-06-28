import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useSignInSignUp from "../hooks/useSignInSignUp";

function SignInSingUpForm(props) {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const { register, login, error, isPending } = useSignInSignUp();
    function formSubmitHandler(e) {
        e.preventDefault();
        // console.log(emailRef.current.value, passRef.current.value);
        if (props.type === "signup") {
            register(emailRef.current.value, passRef.current.value);
        }
        if (props.type === "signin") {
            login(emailRef.current.value, passRef.current.value);
        }
        emailRef.current.value = "";
        passRef.current.value = "";
    }

    var heading = "Sign in";
    var questionToUser = "Not registered yet?";
    var path = "signup";
    var option = "Create an account";
    if (props.type === "signup") {
        heading = "Sign up";
        questionToUser = "Already have an account?";
        path = "signin";
        option = "Sign in";
    }
    return (
        <form
            className="max-w-xs mx-auto mt-24 mb-12 flex flex-col gap-6 text-center px-4 sm:px-0"
            onSubmit={formSubmitHandler}
            autoComplete="off"
        >
            <h1 className="font-logo text-5xl -my-4">FinT</h1>
            <h2 className="text-4xl font-bold my-4">{heading}</h2>
            {error && (
                <p className="bg-red-200 text-red-600 p-4 -mb-3 font-bold rounded">
                    {error}
                </p>
            )}
            <input
                className="bg-secondary rounded p-2 focus:outline-2 focus:outline-primary focus:bg-white placeholder:text-gray-400"
                type="email"
                name="email"
                placeholder="Enter Email"
                ref={emailRef}
                required
            />
            <div className="flex flex-col relative">
                <input
                    className="bg-secondary rounded p-2 focus:outline-2 focus:outline-primary focus:bg-white placeholder:text-gray-400"
                    type="password"
                    placeholder="Password"
                    ref={passRef}
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-primary p-2 rounded text-white hover:bg-primaryDark disabled:bg-primaryDisabled"
                disabled={isPending}
            >
                {heading}
            </button>
            <div className="flex flex-col gap-2">
                <p>{questionToUser}</p>
                <Link className="border-2 rounded p-2" to={`/${path}`}>
                    {option}
                </Link>
            </div>
        </form>
    );
}

export default SignInSingUpForm;
