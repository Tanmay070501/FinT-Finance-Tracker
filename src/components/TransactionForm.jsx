import React, { useRef } from "react";

function TransactionForm({ formSubmitHandler, isPending }) {
    const nameRef = useRef(null);
    const amountRef = useRef(null);
    return (
        <form
            onSubmit={(event) => formSubmitHandler(event, nameRef, amountRef)}
            className="px-4 py-6 rounded text-white max-w-md bg-primary flex flex-col gap-4"
        >
            <label className="flex flex-col gap-1">
                <span>Transaction Name:</span>
                <input
                    className="bg-white rounded p-1 text-black"
                    type="text"
                    required
                    ref={nameRef}
                />
            </label>
            <label className="flex flex-col gap-1">
                <span>Transaction Amount ($):</span>
                <input
                    className="bg-white rounded p-1 text-black "
                    type="number"
                    required
                    ref={amountRef}
                />
            </label>
            <button
                type="submit"
                className="border bg-primaryDark p-2 rounded hover:bg-primary mt-2 disabled:bg-primaryDisabled"
                disabled={isPending}
            >
                Add Transaction
            </button>
        </form>
    );
}

export default TransactionForm;
