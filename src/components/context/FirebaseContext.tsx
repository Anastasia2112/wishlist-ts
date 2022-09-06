import { ReactNode, createContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import { getFirestore, updateDoc, deleteDoc, doc, collection, addDoc } from "firebase/firestore";
import { config } from '../../firebase/config';
import { initializeApp } from 'firebase/app';
import { FirebaseContextType } from '../../models';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import { message } from 'antd';
import { WishType } from '../../models';

type FirebaseContextProviderProps = {
    children: ReactNode
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

const FirebaseContextProvider = ({ children }: FirebaseContextProviderProps) => {
    const app = initializeApp(config.firebaseConfig);
    const auth = getAuth();
    const firestore = getFirestore(app);
    const [user] = useAuthState(auth);
    // const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    const [authError, setAuthError] = useState<boolean>(false);

    // useEffect(() => {
    //     if (localStorage.getItem("user")) {
    //         setUser(JSON.parse(localStorage.getItem("user")))
    //     } else {
    //         setUser(null);
    //     }
    // }, [localStorage.getItem("user")])

    const signInWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider())        
            .then(response => {
                console.log(response.user);
                localStorage.setItem("user", JSON.stringify(response.user))
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
                localStorage.setItem("user", JSON.stringify(response.user));
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
                localStorage.setItem("user", JSON.stringify(userCredential.user));
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
                setAuthError(true);
            });
    }

    const logout = () => {
        signOut(auth);
        localStorage.removeItem("user");
    };

    const updateWish = async (editWish: WishType, id: string) => {
        console.log('id: ', id);
        console.log('values: ', editWish);
        const wishDoc = doc(db, "wishes", id);
        await updateDoc(wishDoc, editWish)
          .then(message.success('Желание изменено!'))
          .catch(message.error('Ошибка при изменении записи.'))
    }

    const deleteWish = async (id: string) => {
        console.log(`Удолить ${id}`);
        const wishDoc = doc(db, "wishes", id);
        await deleteDoc(wishDoc)
          .then(message.success('Желание удалено!'))
          .catch(message.error('Ошибка при удалении записи.'))
    }

    return <FirebaseContext.Provider value={{ auth, firestore, user, signInWithGoogle, createUser, signIn, logout, authError, deleteWish, updateWish }}>
        { children }
    </FirebaseContext.Provider>
}

export default FirebaseContextProvider;