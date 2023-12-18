import React from 'react'
import Postimg from "../Assets/Image/wallpaper.jpg"
import { useLocal } from '../store/auth_context';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Post = () => {
    const {posts} = useLocal();
    const Navigate = useNavigate();
  return (
    <><h1 style={{marginLeft: "7vw",marginTop: "100px"}}>Posts</h1>
    <PostDiv>
        
    {
           posts? posts.map((data) => {
            return (
            <div className="ptdiv" key={data.userID}>
                <img src={data.postImg} alt="This is user image" />
                <h3>{data.title}</h3>
                <p>{data.description}</p>
            </div>
            )}): ""
    }
    <div className="createPost"  onClick={() => {Navigate("../createPost")}}>
        <h1>+</h1>
    </div>
    </PostDiv>
    </>
  )
}

const PostDiv = styled.div`
width: 90vw;
margin-top: 2vw;
margin-left: 5vw;
margin-right: 5vw; 
display: grid;
grid-template-columns: 30% 30% 30%;
.createPost{
    margin: 50px;
    font-size: 20px;
    background: #ddd;
    color: #333;
    padding: 50px;
    width: 360px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 2px solid rgba(5,5,5,0.3);
    &:hover{
        background: #eee;
        border: 2px solid rgba(3,3,3,0.3);
    }
}
h3{
    text-align: center;
}
.ptdiv{
        padding: 50px;
        width: 400px;
        img{
            max-hight: 500px;
            width: 80%;
            margin-left: 10%;
            border-radius: 5px;
        }
       
}
`
export default Post