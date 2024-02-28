import React, {useContext, useState, useEffect} from "react"
import {auth, db} from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true) //by definition its true of course the verification if there is a user signed is true because there are no users


    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password).then(cred => {
             db.collection('users').doc(cred.user.uid)
        })
    }//here we are not creating directly a user

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }



    useEffect(() => {//we are using useEffect because we only want to use this once when we mount the user not after!
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user); //here we are setting the user
            setLoading(false) //then verification changes to false here because after setting the user, there will be a user signed in
        })
        return unsubscribe //this unsubscribes us from the listener, which after we mount it its what we want
    }, [])


    const value = {
        currentUser,
        signup,
        login,
        logout,
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}