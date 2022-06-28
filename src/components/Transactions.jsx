import React from "react";
import { useAuthCtx } from "../hooks/useAuthCtx";
import { useCollecton } from "../hooks/useCollection";
import TransactionCard from "./TransactionCard";
function Transactions() {
    const { user } = useAuthCtx();
    const { documents: transactions, empty } = useCollecton("transactions", [
        "uid",
        "==",
        user.uid,
    ]);
    return (
        <div className="flex flex-col mx-auto my-24 max-w-md gap-8 p-4 px-8 sm:p-0">
            <h2 className="text-xl">Transaction History</h2>
            <TransactionCard transactions={transactions} isEmpty={empty} />
        </div>
    );
}

export default Transactions;
