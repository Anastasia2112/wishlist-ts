import { ReactNode, createContext, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { config } from '../../firebase/config';
import { initializeApp } from 'firebase/app';
import { FirebaseContextType } from '../../models';

type FirebaseContextProviderProps = {
    children: ReactNode
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

const FirebaseContextProvider = ({ children }: FirebaseContextProviderProps) => {
    initializeApp(config.firebaseConfig);
    const auth = getAuth();

    return <FirebaseContext.Provider value={{auth }}>{ children }</FirebaseContext.Provider>
}

export default FirebaseContextProvider;