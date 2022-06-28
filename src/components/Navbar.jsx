import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import HamburgerIcon from "./HamburgerIcon";
function Navbar() {
    const { isPending, logout } = useLogout();
    const [show, setShow] = useState(false);
    const showToggleHandler = () => {
        setShow((prev) => !prev);
    };
    return (
        <nav>
            <div className="bg-purple-100 flex items-center p-4 px-8 md:px-10 xl:px-20 relative">
                <Link className="text-4xl font-logo" to="/">
                    FinT
                </Link>
                <button
                    onClick={showToggleHandler}
                    className={`ml-auto border-primary md:hidden p-1 ${
                        show ? "border" : ""
                    }`}
                >
                    <HamburgerIcon
                        className="text-primary"
                        width="28px"
                        height="28px"
                    />
                </button>
                <div className="ml-auto items-center gap-8 hidden md:flex">
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "underline underline-offset-8 text-purple-800 hover:text-purple-400"
                                : " text-purple-800 hover:text-purple-400"
                        }
                        to=""
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "underline underline-offset-8 text-purple-800 hover:text-purple-400"
                                : "text-purple-800 hover:text-purple-400"
                        }
                        to="transactions"
                    >
                        Transactions
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "underline underline-offset-8 text-purple-800 hover:text-purple-400"
                                : "text-purple-800 hover:text-purple-400"
                        }
                        to="new-transactions"
                    >
                        Add new Transactions
                    </NavLink>
                    <button
                        className="border border-primary text-purple-800 p-2 router rounded font-medium 
                    hover:bg-primary hover:text-white disabled:bg-primaryDisabled"
                        onClick={logout}
                        disabled={isPending}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div
                className={` bg-purple-100 flex flex-col w-full text-center overflow-hidden  gap-4 md:hidden   ${
                    !show ? "max-h-0" : "px-4 py-8"
                }`}
            >
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? " border border-purple-500 text-purple-800 hover:text-purple-400 hover:border-purple-400 p-2"
                            : " text-purple-800 hover:text-purple-400 hover:border-purple-400 p-2"
                    }
                    to=""
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "border border-purple-500 text-purple-800 hover:text-purple-400 hover:border-purple-400 p-2"
                            : "text-purple-800 hover:text-purple-400 hover:border-purple-400 p-2"
                    }
                    to="transactions"
                >
                    Transactions
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "border border-purple-500 text-purple-800 hover:text-purple-400 hover:border-purple-400 p-2"
                            : "text-purple-800 hover:text-purple-400 hover:border-purple-400 p-2"
                    }
                    to="new-transactions"
                >
                    Add new Transaction
                </NavLink>
                <button
                    className="border border-primary text-purple-800 p-2 router rounded font-medium 
            hover:bg-primary hover:text-white disabled:bg-primaryDisabled"
                    onClick={logout}
                    disabled={isPending}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
