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
    const [posts , setPosts] = useState([{
        title: '',
        postImg: "",
        description: "",
        postImg: '',
    }])
    const [userProfile, setUserProfile] = useState({
      id: Data._id,
      headLine: "",
      discription: "",
      avatar: "",
      discription: "",
    })
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const GetPosts = async (tkn) => {
    try {
        const respond = await fetch("http://localhost:3001/api/auth/post",{
          method: "GET",
          headers: {
            Authorization: `Bearer ${tkn}`,
          }
        });
        if(respond.ok){
          const postData = await respond.json();
          setPosts(postData.PostToSend);
        }
    } catch (error) {
        console.log(error);
    }
    }
    const GetProfile = async(tkn) => {
      try {
        const respond = await fetch("http://localhost:3001/api/auth/profile",{
        method: "GET",
        headers: {
          Authorization: `Bearer ${tkn}`,
        }
      })
      const profile = await respond.json();
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
      GetPosts(tkn);
      return storToken;
    };
  
    const LogoutUser = () => {
      const logoutbhai = localStorage.removeItem("token");
      setIsLoggedIn(false); 
      setToken("");
      setData({});
      setPosts([]);

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
      GetPosts(token);
    }, [token]); // Add token as a dependency
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, storTokeninLS, LogoutUser, Data,setData,userProfile ,setUserProfile,posts,setPosts
      }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  // ... (other exports)
  

export const useLocal = () => {
    return useContext(AuthContext);
}
