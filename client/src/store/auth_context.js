import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();


// eslint-disable-next-line
// ... (other imports)

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [Data, setData] = useState({
        email: "",
        firstName: "",
        phoneNo: "",
        _id: ""        
    });
    const [userProfile, setUserProfile] = useState({
      id: Data._id,
      headLine: "",
      discription: "",
      avatar: "",
      discription: "",
    })
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  
    const GetProfile = async(tkn) => {
      try {
        const respond = await fetch("http://localhost:3001/api/auth/profile",{
        method: "GET",
        headers: {
          Authorization: `Bearer ${tkn}`,
        }
      })
      const profile = await respond.json();
      console.log("from Getprofile",profile.userprofile)
      setUserProfile(profile.userprofile);
      } catch (error) {
        console.log(error);
      }
      
    }
    const storTokeninLS = (tkn) => {
      setIsLoggedIn(true); 
      const storToken = localStorage.setItem("token", tkn);
      setToken(tkn);
      userAuthentication(tkn);
      GetProfile(tkn);
      return storToken;
    };
  
    const LogoutUser = () => {
      const logoutbhai = localStorage.removeItem("token");
      setIsLoggedIn(false); 
      setToken("");
      return logoutbhai;
    };
  
    // check if login
    const userAuthentication = async (tkn) => {
      try {
        const respond = await fetch(`http://localhost:3001/api/auth/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tkn}`,
          },
        });
        if (respond.ok) {
          const data = await respond.json();
          console.log("from authentication: ",data);
          setData(data.userData);
        } else {
          console.log("Error from authorization: ", respond.json());
        }
      } catch (error) {
        console.log("from authorization: ", error);
      }
    };
  
    useEffect(() => {
      userAuthentication(token);
      GetProfile(token);
    }, [token]); // Add token as a dependency
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, storTokeninLS, LogoutUser, Data,setData,userProfile ,setUserProfile}}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  // ... (other exports)
  

export const useLocal = () => {
    return useContext(AuthContext);
}
