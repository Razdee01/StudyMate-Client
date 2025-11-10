import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../fireBase/fireBase.init';


const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const[loading,setLoading]=useState(true)

    const googleProvider = new GoogleAuthProvider();

    const createUser = ( email, password) => {
        setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    };
     const signIn=(email,password)=>{
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
     }
     const signInWithGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
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
    };
    return <AuthContext value={authInfo}>
        {children}

    </AuthContext>;
};

export default AuthProvider;