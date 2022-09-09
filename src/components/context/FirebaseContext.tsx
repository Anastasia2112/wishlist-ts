import { ReactNode, createContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import { getFirestore, updateDoc, deleteDoc, doc, collection, addDoc } from "firebase/firestore";
import { config } from '../../firebase/config';
import { initializeApp } from 'firebase/app';
import { FirebaseContextType } from '../../models';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../firebase/config';
import { message } from 'antd';
import { WishType } from '../../models';
import { deleteObject, ref } from 'firebase/storage';

type FirebaseContextProviderProps = {
    children: ReactNode
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

const FirebaseContextProvider = ({ children }: FirebaseContextProviderProps) => {
    const app = initializeApp(config.firebaseConfig);
    const auth = getAuth();
    const firestore = getFirestore(app);
    const [user] = useAuthState(auth);
    // const [user, setUser] = useState<any>();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState<boolean>(false);
    const defaultImg = "https://firebasestorage.googleapis.com/v0/b/wishlist-8a38b.appspot.com/o/images%2Fe6403e96-ccbc-4171-bf83-3187ede329a5frame_gallery_image_images_photo_picture_pictures_icon_123209.png?alt=media&token=234e1228-a638-4c00-9620-d70d4562fa46";

    // useEffect(() => {
    //     let val = localStorage.getItem("user");
    //     if (val) {
    //         setUser(JSON.parse(val))
    //     } else {
    //         setUser(null);
    //     }
    //     console.log('user: ', user);
        
    // }, [auth])

    const signInWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider())        
            .then(response => {
                console.log('signInWithGoogle: ', response.user);
                localStorage.setItem("user", JSON.stringify(response.user))
                // let val = localStorage.getItem("user");
                // if (val) {
                //     setUser(JSON.parse(val))
                // }
                // navigate('/');
                // console.log('user: ', user);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const createUser = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log('createUser: ', response.user);
                localStorage.setItem("user", JSON.stringify(response.user));
                // let val = localStorage.getItem("user");
                // if (val) {
                //     setUser(JSON.parse(val))
                // }
                // navigate('/');
                // console.log('user: ', user);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    };

    const signIn = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('signIn: ', userCredential.user);
                localStorage.setItem("user", JSON.stringify(userCredential.user));
                // let val = localStorage.getItem("user");
                // if (val) {
                //     setUser(JSON.parse(val))
                // }
                // navigate('/');
                // console.log('user: ', user);
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

    const updateWish = async (editWish: any, id: string) => {
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
          .catch(message.error('Ошибка при удалении записи.'));
          
    }

    const deleteImgFromStorage = async (imgName: string | undefined) => {
        // if (imgName) {
        //     const desertRef = ref(storage, `images/${imgName}`);
        // await deleteObject(desertRef).then(() => {
        //     console.log('Img deleted successfully');
        //   }).catch((error) => {
        //     console.log(error);
        //   });
        // }
        
        
    }

    return <FirebaseContext.Provider value={{ auth, firestore, user, signInWithGoogle, createUser, signIn, logout, authError, deleteWish, updateWish, defaultImg, deleteImgFromStorage }}>
        { children }
    </FirebaseContext.Provider>
}

export default FirebaseContextProvider;