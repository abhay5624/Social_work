import React from 'react'
import '../css/homepage.css'
import { useLocal } from '../store/auth_context';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
export default function Homepage() {
  const { allPost }= useLocal();
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  return (
    token ? (
    <div style={{display: 'flex'}}>
    <Sidebar/>
    <div>
    <h2 style={{textAlign: 'center',color: 'black',padding: "100px"}}>All the posts are Here</h2>

    <AllPost>
        {allPost ?
            allPost.map((post) => (
              <div key={post._id}>
                <img src={post.postImg} alt="" />
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
            ))
        :""
        }
    </AllPost>
    
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
    ): Navigate("../login"))
}
const AllPost = styled.div`
width: 70%;
margin-left: 20%;
display: grid;
grid-template-columns: auto auto auto auto;
gap: 20px;
div{
  padding: 10px;
}
img{
  margin-left: 10%;
  height: 300px;
  width: 80%;
}
`