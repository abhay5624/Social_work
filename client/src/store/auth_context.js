import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();


// eslint-disable-next-line
export const AuthProvider = ({children}) => {
    const [token, setToken]= useState(localStorage.getItem("token"));
    const [Data, setData] = useState();


    //Store in database 
    const storTokeninLS = (tkn) => {
        console.log("This run");
        isLoggedIn= !isLoggedIn;
        const storToken = localStorage.setItem("token", tkn)
        setToken(tkn);
        userAuthentication(tkn);
        return storToken;
    }
    let isLoggedIn = !!token;
    const LogoutUser = () => {
        const logoutbhai = localStorage.removeItem("token");
        isLoggedIn= !isLoggedIn;
        setToken("");
        return logoutbhai;
    }


    // check if login
    const userAuthentication = async(tkn) => {
        try {
            const respond = await fetch(`http://localhost:3001/api/auth/user`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${tkn}`
            },
        });
        if(respond.ok){
            const data = await respond.json();
            setData(data.userData);
        }else{
            console.log("from authorization: ",respond.json())
        }    
        } catch (error) {
            console.log("from authorization: ",error)
        }
    }
    useEffect(() => {
      userAuthentication(token);
    },[]);
    return <AuthContext.Provider value={{isLoggedIn,storTokeninLS, LogoutUser, Data}}>
        {children}
    </AuthContext.Provider>
}

export const useLocal = () => {
    return useContext(AuthContext);
}
