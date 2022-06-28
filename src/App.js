import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Transactions from "./components/Transactions";
import { useAuthCtx } from "./hooks/useAuthCtx";

import Home from "./pages/Home";
import NewTransaction from "./pages/NewTransaction";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
    const { isAuthReady, user } = useAuthCtx();
    // const { documents: transactions } = useCollecton(
    //     "transactions",
    //     ["uid", "==", user.uid]
    // );
    return (
        <BrowserRouter>
            {isAuthReady && (
                <Routes>
                    {/*<Route
                        path="/"
                        element={
                            user ? <Home /> : <Navigate replace to="/signin" />
                        }
                    />*/}
                    <Route
                        path="/"
                        element={
                            user ? (
                                <Layout />
                            ) : (
                                <Navigate replace to="/signin" />
                            )
                        }
                    >
                        {user && (
                            <>
                                <Route path="" element={<Home />} />
                                <Route
                                    path="transactions"
                                    element={<Transactions />}
                                />
                                <Route
                                    path="new-transactions"
                                    element={<NewTransaction />}
                                />
                            </>
                        )}
                    </Route>
                    <Route
                        path="/signin"
                        element={
                            !user ? <SignIn /> : <Navigate replace to="/" />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            !user ? <SignUp /> : <Navigate replace to="/" />
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            )}
            {!isAuthReady && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <LoadingSpinner />
                </div>
            )}
        </BrowserRouter>
    );
}

export default App;
