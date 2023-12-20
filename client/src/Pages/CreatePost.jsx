import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocal } from '../store/auth_context'
import { json, useNavigate} from "react-router-dom"
const CreatePost = () => {
    const {userProfile} = useLocal();
    const {posts} = useLocal();
    const {Data} = useLocal();
    const [tag, setTag] = useState();
    const Navigate = useNavigate();
    const {setPosts} = useLocal();
    const [PostData, setPostData] = useState({
        title: "",
        postImg: "",
        description: "",
        tags: []
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respond = await fetch("http://localhost:3001/api/auth/post", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(PostData,PostData)
            })
            if(respond.ok){
                console.log(respond.json());
                Navigate("/profile");
            }else{
                console.log(respond);
                alert("Cant post a error occur");
            }
        } catch (error) {
        alert("Cant post a error occur");
        }
    }
    const convertToBase64 = (file) => {
        const fileReader =new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          setPostData({...PostData, postImg: `${fileReader.result}`})
        };
  }
    const HandleImage = (e) => {
        const file = e.target.files[0];
        convertToBase64(file);
    }
  return (
    <div> 
    <div style={{position: "relative"}}>
        <div style={{width: "100%", height: "200px", background: "rgba(0,0,0,0.5)", position: "absolute", top: "0px", left: "0px"}}></div>
        <img src={userProfile.background} alt="" style={{width: "100%", height: "200px"}}/>
        <h2 style={{position: "absolute",left: "50px",bottom: "18px",color: "white"}}>{Data.firstName} /Create Post</h2>
    </div>
    <StyledPost>
        <h1 style={{margin: "10px"}}>Your Post</h1>
        <div className='flexbox'>
            <div className='Post'>
                <img src={PostData.postImg} alt=""/>
                <h2>{PostData.title}</h2>
                <p>{PostData.description}</p>
            </div>
            <div>
                <h2>Create New Post</h2>
                <form  className='Grid' onSubmit={(e) => {handleSubmit(e)}}>
                    <h4>Title</h4> 
                    <input type="text" name="title" value={PostData.title} onChange={(e) => {setPostData({...PostData, title: e.target.value})}}/>
                    <h4>Discription</h4> 
                        <input type="text" name="discription" id="discription" value={PostData.description} onChange={(e) => {setPostData({...PostData, description: e.target.value})}}/>
                     
                    <h4 >Post Images</h4> 
                        <input type="file" name="postImg" id="postImg" accept='.jpeg,.png,.jpg' onChange={(e) => {HandleImage(e)}}/>
                        <div className="addbtn" onClick={(e) => {setPostData({...PostData, tags: [...PostData.tags,tag]})}}>Add Tags</div>
                        <input type="text" name='tags' placeholder='Enter New Tag' onChange={(e) => {setTag(e.target.value)}}/>
                        <div className='tags' style={{width: "100%"}}>
                        {
                            PostData.tags.map((element)=> (
                                <button style={{margin: "5px"}}>{element}</button>
                            ))
                        }
                        </div>    
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </StyledPost>
    </div>
  )
}
const StyledPost = styled.div`
width: 80%;
margin-left:10%;
padding-top: 50px;
.addbtn{
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    border: 2px solid #333;
    border-radius: 5px;
    padding: 10px 20px;
    &:hover{
        background-color: #190582;
        color: white;
        border: white;
    }
}
.tags{
    
    display: grid;
    grid-column: span 2;
    grid-template-columns: auto auto auto auto auto auto auto auto;
}
h1,h2{
    text-align: center;
    color: black;
}
form{
    padding: 30px;
}
input{
    padding: 10px;
}
button{
    widht: 100%;
    padding: 10px;
    background-color: #190582;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 19px;
    grid-column: span 2;
}
.Post{
    padding: 50px;
    width: 80%;
    img{
        width: 80%;
        margin-left: 10%;
        border-radius: 5px;
    }
}
.flexbox{
    display: flex;
    div{
        width: 50%;
    }
    .Grid{
        display: grid;
        gap: 15px;
        grid-template-columns: 30% 70%;
    }
}`
export default CreatePost