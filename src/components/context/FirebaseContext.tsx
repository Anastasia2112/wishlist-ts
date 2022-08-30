import { ReactNode, createContext, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { config } from '../../firebase/config';
import { initializeApp } from 'firebase/app';
import { FirebaseContextType } from '../../models';

type FirebaseContextProviderProps = {
    children: ReactNode
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

const FirebaseContextProvider = ({ children }: FirebaseContextProviderProps) => {
    const app = initializeApp(config.firebaseConfig);
    const auth = getAuth();
    const firestore = getFirestore(app);

    return <FirebaseContext.Provider value={{auth, firestore}}>{ children }</FirebaseContext.Provider>
}

export default FirebaseContextProvider;