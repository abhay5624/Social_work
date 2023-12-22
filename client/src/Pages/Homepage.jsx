import React, { useEffect } from 'react'
import '../css/homepage.css'
import Navbar from '../components/Navbar.jsx'
import { useLocal } from '../store/auth_context';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
export default function Homepage() {
  const { allPost }= useLocal();
  
  const Navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("token");
  if(!token){      
    console.log("this run");
    Navigate("/login")
  }
}, [])

 
  return (
  (
    <>
    <div style={{display: 'flex',minHeight: "100vh"}}>
    <Sidebar/>
    <div className='homepage'>
    <h2 style={{textAlign: 'center',color: 'black',padding:'20px'}}>All the posts are Here</h2>

    <div className='AllPost'>
        {allPost ?
            allPost.map((post) => (
              <div className='post-card' key={post._id}>
                <img src={post.postImg} alt="" />
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
            ))
            :""
          }
    </div>
    
    {/* <div className='homepage'>
        <div className='left'></div>
        <div className='right'>
        <div id='top'>Hey Buddy! New here</div>
        <div id='bottom'>Welcome to open blank page, this is one of the oldest ancient 
        non organized society, designed to ruin your day, time and 
        career.</div>
        </div>
      </div>     */}
    </div>
    </div>
      </>
    ))
}
// const AllPost = styled.div`
// width: 70%;
// margin-left: 30%;
// display: grid;
// grid-template-columns: auto auto auto auto;
// gap: 20px;
// min-height: 60vh;
// div{
//   padding: 10px;
// }
// img{
//   margin-left: 10%;
//   height: 300px;
//   width: 80%;
// }
// `