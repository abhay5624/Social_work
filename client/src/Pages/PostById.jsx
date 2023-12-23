import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocation ,useNavigate} from 'react-router-dom'
import { useLocal } from '../store/auth_context';
import styled from 'styled-components';
import Loader from '../Assets/Image/loader.gif'
import '../css/pagecss/PostById.css'
import Sidebar from '../components/Sidebar';
import UpdatePopup from '../components/UpdatePopup';
const PostById = () => {
    const {posts} = useLocal();
    const Location = useLocation();
    const ID = Location.pathname.split("/post/");
    const [data , setData] = useState({
        _id: {},
        title: "",
        description: "",
        postImg: "",
        tags: [],
    });
    //console.log("This is from post: ",data);
    const Navigate = useNavigate();
    const GetPost = async () => {
        const tkn = localStorage.getItem("token");
        const pt = await fetch(`http://localhost:3001/api/auth/postById?id=${ID[1]}`,{
            headers: {
                Authorization: `Bearer ${tkn}`
            }
        });
        if(pt.ok){
            const dataof = await pt.json();
            console.log(dataof.data);
            setData(await dataof.data);
        }else{
            console.log(pt);
            console.log("data is not there");
        }
    }
    const deletePost = async() => {
        const tkn = localStorage.getItem("token");
        try {
            const dataToSend  = {
                id: data._id,
                userId: posts[0].userID,
            }
            console.log(dataToSend);
            const respond = await fetch("http://localhost:3001/api/auth/post",{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tkn}`,
            },
            body: JSON.stringify(dataToSend)
        })
        if(respond.ok){
            Navigate("/profile");
        }
    } catch (error) {
        console.log(error);
        }
        
    }
    useEffect(() => {
        GetPost();
    }, [])
    
   
    return (<>
  <Navbar />
    <Sidebar/>
    <div className='PostDivById'>
            
        <div className='topheading'>
            <h2 >My Post</h2>
            <button className='Dlt' onClick={() => {deletePost()}}>Delete</button>
        </div>
        
        <div className='mainpostbox'>
            <div className='leftpost ' style={  {backgroundImage: `url(${
                process.env.PUBLIC_URL + (data.postImg)?"":Loader})`}}>
            <h3>{data.title}</h3><br/>
            <p>{data.description}</p>
            <button className='EdtPst'>Edit</button>
            </div>
            <div className='rightpost' style={  {backgroundImage: `url(${
                process.env.PUBLIC_URL + (data.postImg)?data.postImg:Loader})`}}>
                    
            <img src={(data.postImg)?data.postImg:Loader} alt="" />
            </div>

      
        </div>
        <div className='posttags'>
        {data.tags? data.tags.map((e) => (
            <button>{e}</button>    
            )): ""}
        </div>
    </div>
        {/*<UpdatePopup data={data}/>*/}
    </>
  )
}
// const PostDiv = styled.div`
// display: grid;
// grid-template-columns: 50% 50%;
// width: 60%;
// margin-left: 30%;
// padding: 50px;
// h3{
//     display: flex;
//     align-items: center;
//     padding: 20px;
// }
// button{
//     padding: 10px;
//     margin: 3px;
//     background-color: #190582;
//     color: white;
//     border: none;
//     border-radius: 5px;
// }
// img{
//     width: 300px;
// }
// .Dlt{
//     background: red;
//     padding: 10px;
//     color: white;
//     font-weight: 500;
//     border: none;
//     border-radius: 5px;
//     margin: 10px;
// }
// .EdtPst{
//     background: green;
//     padding: 10px 30px;
//     color: white;
//     font-weight: 500;
//     border: none;
//     border-radius: 5px;
//     margin: 10px;
// }
// `; 
export default PostById
