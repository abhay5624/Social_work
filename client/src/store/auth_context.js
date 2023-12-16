import { createContext, useContext, useState } from "react";
export const AuthContext = createContext();


// eslint-disable-next-line
export const AuthProvider = ({children}) => {
    const [token, setToken]= useState(localStorage.getItem("token"));
    const storTokeninLS = (token) => {
        isLoggedIn= false;
        return localStorage.setItem("token", token);
    }
    let isLoggedIn = !!token;
    const LogoutUser = () => {
        const logoutbhai = localStorage.removeItem("token");
        isLoggedIn= true;
        setToken("");
        return logoutbhai;
    }
    return <AuthContext.Provider value={{isLoggedIn,storTokeninLS, LogoutUser}}>
        {children}
    </AuthContext.Provider>
}

export const useLocal = () => {
    return useContext(AuthContext);
}
