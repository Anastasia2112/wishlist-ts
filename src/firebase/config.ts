import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

export const config = {
    firebaseConfig: {
        apiKey: "AIzaSyD1ETk-lRG7tJWAwCzWyZmXPvXjQFIOjbA",
        authDomain: "wishlist-8a38b.firebaseapp.com",
        projectId: "wishlist-8a38b",
        storageBucket: "wishlist-8a38b.appspot.com",
        messagingSenderId: "351545538896",
        appId: "1:351545538896:web:099ccd739d462972719455",
        measurementId: "G-01VL1NP1PE"
    }
};

export const app = initializeApp(config.firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);