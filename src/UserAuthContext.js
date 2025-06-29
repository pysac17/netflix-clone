import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function logOut() {
        return signOut(auth);
    }
    async function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        try {
            return await signInWithPopup(auth, googleAuthProvider);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            throw error; // Re-throw to handle in the component
        }
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        // console.log("Auth", currentuser);
        setUser(currentuser);
        });

        return () => {
        unsubscribe();
        };
    }, []);

    return (
        <userAuthContext.Provider
        value={{ user, logIn, signUp, logOut, googleSignIn }}
        >
        {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}