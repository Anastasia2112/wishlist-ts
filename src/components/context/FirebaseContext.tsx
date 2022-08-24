import { ReactNode, createContext } from 'react';
import { getAuth } from 'firebase/auth';
import { config } from '../../firebase/config';
import { initializeApp } from 'firebase/app';

type FirebaseContextProviderProps = {
    // firebase: any;
    children: ReactNode
    // firestore: any;
}

initializeApp(config.firebaseConfig);

const auth = getAuth();

export const FirebaseContext = createContext(auth);

const FirebaseContextProvider = ({ children }: FirebaseContextProviderProps) => {
    return <FirebaseContext.Provider value={ auth }>{ children }</FirebaseContext.Provider>
}

export default FirebaseContextProvider;