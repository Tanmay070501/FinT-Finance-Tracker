import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import { db } from "../firebase/config";
import { useAuthCtx } from "../hooks/useAuthCtx";

function NewTransaction() {
    const { user } = useAuthCtx();
    const [isPending, setIsPending] = useState(false);
    const formSubmitHandler = async (e, nameRef, amountRef) => {
        setIsPending(true);
        e.preventDefault();
        const ref = collection(db, "transactions");
        await addDoc(ref, {
            uid: user.uid,
            name: nameRef.current.value,
            amount: amountRef.current.value,
        });
        setIsPending(false);
        nameRef.current.value = "";
        amountRef.current.value = "";
    };
    return (
        <div className="mx-auto my-24 flex flex-col max-w-md gap-8 p-4 px-8 sm:p-0">
            <h2 className="text-xl">Add new Transactions</h2>
            <TransactionForm
                isPending={isPending}
                formSubmitHandler={formSubmitHandler}
            />
        </div>
    );
}

export default NewTransaction;
