import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../fireBase/fireBase.init';


const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const[loading,setLoading]=useState(true)

    const googleProvider = new GoogleAuthProvider();

    const createUser = ( email, password) => {
        setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
   
    };
    const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
    
     const signInWithGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
     }
     const LogOut=()=>{
        setLoading(true)
        return signOut(auth);
     }
     useEffect(()=>{
        const unsubcribe=onAuthStateChanged(auth,(curretUser)=>{
            setUser(curretUser)
            setLoading(false)
        })
        return ()=>{
            unsubcribe()
        }
     },[])
    const authInfo = {
      createUser,
      user,
      loading,
      signIn,
      signInWithGoogle,
      setUser,
       LogOut
    };
    return <AuthContext value={authInfo}>
        {children}

    </AuthContext>;
};

export default AuthProvider;