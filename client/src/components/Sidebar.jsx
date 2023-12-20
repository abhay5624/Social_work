import React from 'react'
import { useLocal } from '../store/auth_context'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Sidebar = () => {
    const {Data} = useLocal();
    const {userProfile} = useLocal();
  return (
    <AsideBar>
    {userProfile? <img src={userProfile.avatar} style={{borderRadius: "50%"}} alt="" />: ""}    
    {Data? <h4>{Data.firstName}</h4>:""}
   
    
    <div className="line"></div>
    {userProfile?     <h5 style={{gridColumn: "span 2",textAlign: "center"}}>{userProfile.headLine}</h5>
:""}
    <Link style={{gridColumn: "span 2"}} to="../profile">My Profile</Link>
    <Link style={{gridColumn: "span 2"}} to="../updateProfile">Edit my Profile</Link>
    <Link style={{gridColumn: "span 2"}} to="../createPost">Create a new Post</Link>
    <Link style={{gridColumn: "span 2"}} to="../search">Advance Search</Link>
    <Link to = "../messages"> Message</Link>
    <Link to = "../logout"> Log Out</Link>
    </AsideBar>
  )
}
const AsideBar = styled.div`
display: grid;
grid-template-columns: auto auto;
grid-template-rows: 100px 5px 50px 50px 50px 50px 50px 50px;
padding: 15px;
width: 15%;
color: white;
height: 100vh;
position: fixed;
z-index: 10;
left: 0;
a{
    margin: 5px;
    padding: 3px;
    border: 2px solid white;
    color: white;
    grid-columns: span 2; 
}
.line{
    max-height: 3px;
    grid-column: span 2;
    background: white;
}
background-color: #190582;
h4{
    margin-top: 30px;
    height: 80px;
}
img{
    width: 60%;
    margin: 20px;
}
`
export default Sidebar