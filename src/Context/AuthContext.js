import {  createContext, useContext, useState } from "react";


const AuthContext = createContext();


export const  AuthProvidder = ({children})  =>{
    const [auth, setAuth] = useState(localStorage.getItem('user') ? true : false);
const [role, setRole] = useState(sessionStorage.getItem('role') || '');
    
    const login = (res) => {
        debugger
        console.log(res);
        setAuth(true)
        setRole(res.role)
        
        localStorage.setItem('user',res.token)
        localStorage.setItem("userId",res.user.id)
        sessionStorage.setItem('userPhone',res.user.phoneNumber)
        sessionStorage.setItem('userName',res.user.userName)
        sessionStorage.setItem('role',res.role)
    }
    const logout = () =>{
        setAuth(false)
        setRole('')
        localStorage.clear();
        sessionStorage.clear();
    }

    return (
        <AuthContext.Provider value={{auth,setAuth,role,setRole,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UseAuth = () => useContext(AuthContext)