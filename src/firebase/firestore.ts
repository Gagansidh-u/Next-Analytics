// src/firebase/firestore.ts
'use client';

import { addDoc, collection, serverTimestamp, type Firestore } from "firebase/firestore";

type CustomerData = {
    name: string;
    email: string;
};

export const addCustomer = async (db: Firestore, customer: CustomerData) => {
    if (!db) {
        throw new Error("Firestore is not initialized.");
    }
    try {
        const docRef = await addDoc(collection(db, "customers"), {
            ...customer,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Could not save customer details.");
    }
};
