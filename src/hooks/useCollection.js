import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
export const useCollecton = (collectionName, _query) => {
    const [documents, setDocuments] = useState([]);
    const [empty, setEmpty] = useState(false);

    const customQuery = useRef(_query).current;
    useEffect(() => {
        let ref = collection(db, collectionName);
        if (customQuery) {
            ref = query(ref, where(...customQuery));
        }
        const unsubscribe = onSnapshot(
            ref,
            (snapshot) => {
                let results = [];
                snapshot.docs.forEach((doc) => {
                    results.push({ ...doc.data(), id: doc.id });
                });
                setDocuments(results);
                setEmpty(snapshot.empty);
            },
            (error) => {
                setEmpty(true);
                alert(error.message);
            }
        );

        return () => unsubscribe();
    }, [collectionName, customQuery]);

    return { documents, empty };
};
