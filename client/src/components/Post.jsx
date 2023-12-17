import React from 'react'
import Postimg from "../Assets/Image/wallpaper.jpg"
import styled from 'styled-components';
const Post = () => {
    const Posts = [{
        title: "phla hai bhai",
        disciption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, earum.',
        img: {Postimg}
    },{
        title: "phla hai bhai",
        disciption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, earum.',
        img: {Postimg}
    },{
        title: "phla hai bhai",
        disciption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, earum.',
        img: {Postimg}
    },{
        title: "phla hai bhai",
        disciption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, earum.',
        img: {Postimg}
    },{
        title: "phla hai bhai",
        disciption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, earum.',
        img: {Postimg}
    },{
        title: "phla hai bhai",
        disciption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, earum.',
        img: {Postimg}
    }];
  return (
    <><h1 style={{marginLeft: "7vw",marginTop: "100px"}}>Posts</h1>
    <PostDiv>
        
    {
            Posts.map((data) => {
            return (
            <div className="ptdiv">
                <img src={data.img.Postimg} alt="This is user image" />
                <h3>{data.title}</h3>
            </div>
            )})
    }
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
grid-template-columns: auto auto auto;
.ptdiv{
    img{
        width: 100%;
        border-radius: 5px;
    }
    padding: 10px;
    margin: 10px;
    width: 80%;
    margin: 20px;
    
}
`
export default Post