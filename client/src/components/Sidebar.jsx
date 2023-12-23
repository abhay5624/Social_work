import React from 'react'
import { useLocal } from '../store/auth_context'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../css/componentcss/sidebar.css';
import Burger from '../Assets/icons/Hamburger_icon.png'
const Sidebar = () => {
    const {Data} = useLocal();
    const {userProfile} = useLocal();
  return (
    <>
   

    <input type="checkbox" id="tg" />
   <label htmlFor="tg" id="profile-toggler">
     <div id="popen">
                  <img src={Burger} alt="" />
                </div>
     <div id="pclose">❌</div>
   </label>
    <div id='sideBar'>
       
    
    {userProfile? <img src={userProfile.avatar} style={{borderRadius: "50%"}} alt="" />: ""}    
    
    {Data? <h4>{Data.firstName}</h4>:""}
   
    
    {/* <div className="line"></div> */}
   
    {userProfile?     <h5>{userProfile.headLine}</h5>
:""}
<br/>
    <div className='options'><Link to="../profile">My Profile</Link></div>
    <div className='options'><Link to="../updateProfile">Edit my Profile</Link></div>
    <div className='options'><Link to="../createPost">Create a new Post</Link></div>
    <div className='options'><Link to="../search">Advance Search</Link></div>
    <div className='options'>
        <Link to = "../messages"> Message</Link>
        <Link to = "../logout"> Log Out</Link>
        </div>
    </div>

</>
  )
}

export default Sidebar