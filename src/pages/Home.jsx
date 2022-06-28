import React from "react";
import { useAuthCtx } from "../hooks/useAuthCtx";
import { useCollecton } from "../hooks/useCollection";
function Home() {
    const { user } = useAuthCtx();
    const { documents: transactions, empty } = useCollecton("transactions", [
        "uid",
        "==",
        user.uid,
    ]);
    let expense = 0,
        income = 0;
    transactions.forEach((element) => {
        const amount = parseInt(element.amount);
        amount < 0 ? (expense += amount) : (income += amount);
    });
    return (
        <div className="mx-auto my-24 flex flex-col max-w-md gap-8 p-4 px-8 sm:p-0">
            <div className="space-y-4">
                <h2 className="text-2xl">Your Balance</h2>
                {empty && <p className="text-4xl">$0</p>}
                {!empty && transactions.length !== 0 && (
                    <p className="text-4xl">${expense + income}</p>
                )}
                {!empty && transactions.length === 0 && <p>Loading...</p>}
            </div>
            <div className="border shadow flex p-4 sm:p-8 justify-around text-center">
                <div className="font-bold space-y-3">
                    <h3 className="text-xl sm:text-2xl text-green-600">
                        Income
                    </h3>
                    {empty && <p className="text-4xl">$0</p>}
                    {!empty && transactions.length !== 0 && (
                        <p className="text-4xl">${income}</p>
                    )}
                    {!empty && transactions.length === 0 && <p>Loading...</p>}
                </div>
                <div className="border-l-2"></div>
                <div className="font-bold space-y-3">
                    <h3 className="text-xl sm:text-2xl text-red-600">
                        Expense
                    </h3>
                    {empty && <p className="text-4xl">$0</p>}
                    {!empty && transactions.length !== 0 && (
                        <p className="text-4xl">${Math.abs(expense)}</p>
                    )}
                    {!empty && transactions.length === 0 && <p>Loading...</p>}
                </div>
            </div>
            {/*!empty && transactions.length === 0 && <p>Loading...</p>*/}
        </div>
    );
}

export default Home;
