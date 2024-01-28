"use client"

import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, User, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useCallback, useState } from 'react';


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSGER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: "G-GS3VZ1FH88"
};

const provider = new GoogleAuthProvider();

export default function useAuthentication() {
    const [user, setUser] = useState<User | undefined>(undefined)

    const initialise = useCallback(() => {
        initializeApp(firebaseConfig);
    }, [])

    const signInWithGoogle = useCallback(() => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential!.accessToken;
                const user = result.user;
                console.log(user)
                setUser(user)
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }, [])

    const signOutFromApp = useCallback(() => {
        const auth = getAuth();
        signOut(auth).then(result => {
            setUser(undefined)
        }).catch(error => {
            alert(`Something went wrong on logout ${error}`)
            setUser(undefined)
        })
    }, [])



    return { signInWithGoogle, user, initialise, signOutFromApp }
}