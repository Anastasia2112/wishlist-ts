import { ReactNode, createContext, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { config } from '../../firebase/config';
import { initializeApp } from 'firebase/app';
import { FirebaseContextType } from '../../models';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

type FirebaseContextProviderProps = {
    children: ReactNode
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

const FirebaseContextProvider = ({ children }: FirebaseContextProviderProps) => {
    const app = initializeApp(config.firebaseConfig);
    const auth = getAuth();
    const firestore = getFirestore(app);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider())        
            .then(response => {
                console.log(response.user);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    };

    // const createUserWithEmailAndPassword
    const createUser = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    };

    const signIn = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const logout = () => {
        signOut(auth);
    };

    return <FirebaseContext.Provider value={{ auth, firestore, user, signInWithGoogle, createUser, signIn, logout }}>
        { children }
    </FirebaseContext.Provider>
}

export default FirebaseContextProvider;