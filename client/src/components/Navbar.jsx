import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import { useLocal } from "../store/auth_context";
import Logo from '../Assets/icons/logo-01.svg'
import Name from '../Assets/icons/name.svg'

export default function Navbar() {
  const { isLoggedIn } = useLocal();
  const [Log, setLog] = useState(isLoggedIn);
  useEffect(() => {
    setLog(isLoggedIn);
  }, [isLoggedIn]);
  const [search,setSearch]=useState();
  const [userProfie ,setUserProfile] =useState();
  const handleSearch = async(e) => {
    e.preventDefault();
    try {
      const respond = await fetch(`http://localhost:3001/api/auth/searchPerson?name=${search}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if(respond.ok){
        const data = await respond.json();
        console.log(data);
        setUserProfile(data);
        console.log("state is: ",userProfie);
        setSearch("");
      }else{
        setUserProfile();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div id="navbar">
        <div className="navlogo">
            <img src={Logo} alt="" />
            <img src={Name} alt="" />
        </div>
        <input type="checkbox" id="toggler" />
        <label htmlFor="toggler" id="tog">
          <div id="menu">toggler</div>
          <div id="close">close</div>
        </label>
        {/* <div style={{height:'70px' , backgroundSize: "contain",objectFit:"cover"}}>
          <img src={Logo} alt="" />
          </div> */}
        <div id="navmenu">

        <div className='search-form'>
        <form  onSubmit={(e) =>(handleSearch(e))} >
        
            <input
              type="text" placeholder='SEARCH'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
              />
       
          </form>
          <button type="button" onClick={handleSearch} className="search-button">
            🔍
          </button>
          {
            (userProfie)? (
              <div className="searchProfile">
                <div style={{display: "flex",justifyContent: "center",alignItems: "center",cursor: "pointer"}} onClick={()=> {setUserProfile()}}>
                  <h1>X</h1>
                </div>
                <div>
                  <h1>{userProfie.User.firstName}</h1>
                  <p>{userProfie.User.email}</p>
                </div>
                <button>View</button>
              </div>
            ) : " " 
          }
          </div>
         
          <div>
            <Link to="/">Home</Link>
          </div>

          {!Log ? (
            <>
              <div>
                <Link to="/login">Login</Link>
              </div>
              <div>
                <Link to="/signup">Sign up</Link>
              </div>
            </>
          ) : (
            <div>
              <Link to="/Logout">Logout</Link>
            </div>
          )}

          <div>
            <Link to="/Global">Global Chat</Link>
          </div>
          <div>
            <Link to="/ClubRoom">Club Room</Link>
          </div>
        </div>
      </div>
    </>
  );
}
