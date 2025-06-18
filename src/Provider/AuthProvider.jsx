import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import PropTypes from 'prop-types'
import useAxiosPublic from '../hooks/useAxiosPublic';

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const axiosPublic = useAxiosPublic();
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('User onlione');
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                axiosPublic.post('/jwt', { email: currentUser?.email })
                    .then(() => console.log('Token'))
            }
            else {
                axiosPublic.post(`/logout`, { email: currentUser?.email })
                    .then(res => console.log(res.data, 'logged out'))
            }
        })
        return () => {
            unsubscribe();
        }
    }, [])
    const update = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    const authInfo = { user, loading, setLoading, createUser, login, update, googleLogin, logout };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node
}

export { AuthProvider, AuthContext };