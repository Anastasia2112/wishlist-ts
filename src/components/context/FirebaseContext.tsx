import { ReactNode, createContext, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { config } from '../../firebase/config';
import { initializeApp } from 'firebase/app';
import { FirebaseContextType } from '../../models';
import { useAuthState } from 'react-firebase-hooks/auth';

type FirebaseContextProviderProps = {
    children: ReactNode
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

const FirebaseContextProvider = ({ children }: FirebaseContextProviderProps) => {
    const app = initializeApp(config.firebaseConfig);
    const auth = getAuth();
    const firestore = getFirestore(app);
    const [user] = useAuthState(auth);

    return <FirebaseContext.Provider value={{auth, firestore, user}}>
        { children }
    </FirebaseContext.Provider>
}

export default FirebaseContextProvider;