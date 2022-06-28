import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
function TransactionCard({ transactions, isEmpty }) {
    const deleteHandler = async (id) => {
        const docRef = doc(db, "transactions", id);
        await deleteDoc(docRef);
    };

    return (
        <div className="flex flex-col gap-12">
            {isEmpty && <p className="text-red-600">No transactions found</p>}
            {!isEmpty && transactions.length === 0 && <p>Loading...</p>}
            {!isEmpty &&
                transactions.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className={`flex justify-between border-l-4 ${
                                parseInt(item.amount) < 0
                                    ? "border-red-600"
                                    : "border-green-600"
                            } px-4 py-8 shadow-lg font-bold sm:text-lg relative`}
                        >
                            <h3>{item.name}</h3>
                            <p>${Math.abs(parseInt(item.amount))}</p>
                            <button
                                className="absolute top-0 right-0 text-base text-slate-400 -translate-x-1 translate-y-1 p-0"
                                onClick={() => deleteHandler(item.id)}
                            >
                                X
                            </button>
                        </div>
                    );
                })}
        </div>
    );
}

export default TransactionCard;
