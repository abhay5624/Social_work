import React from 'react'
import { useLocal } from '../store/auth_context'
import Avatar from "../Assets/Image/avatar.jpg"
import styled from 'styled-components';
import Loading from "../Assets/Image/Loading.png"
import Post from '../components/Post';
import { useNavigate } from 'react-router-dom';
import '../css/pagecss/profile.css'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
const Profile = () => {
    const {Data} = useLocal();
    const {userProfile} = useLocal();
    const Navigate = useNavigate();
  return (

    <>
    <div className='ProfileDiv'>
      {
        (!Data.firstName)? <div className="loader">
          <img src={Loading} alt="" />  
        </div>:
      <>
        <div className="backdroundDiv">
          
        {(userProfile)? <img src={userProfile.background} alt="" /> : <img src={Loading} alt="" />}
          <div className="avatar"><img src={(userProfile)? userProfile.avatar: Avatar} alt="We need your profile" /></div>
        </div>
        <br/>
        <div className="nameDetail">
          <div className="flexbox">
          

          <h2>{Data.firstName}</h2>
          <button onClick={() => {Navigate('/updateProfile')}}>🖋️</button>
         
          </div>
          <p style={{fontWeight: 600,fontSize: "20px"}}>{Data.email.split("@nitjsr.ac.in")}</p>
          <p style={{fontWeight: 500}}>{userProfile ? userProfile.headLine: ""}
            </p>
          <p>{userProfile? userProfile.discription: ""}</p>
          <p>{Data.email}</p>
        </div>
        
        <Post />
        
        </>
      }
    </div>
      </>
  )
}
// const ProfileDiv = styled.div`
// .loader{
//   width: 100vw;
//   height: 100vh;
//   background: #ddd;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
// .flexbox{
//   display: flex;
//   justify-content: space-between;
//   button {
//     padding: 10px 30px;
//     color: white;
//     background: #190582;
//     border: none;
//     border-radius: 5px;
//     font-size: 15px;
//   }
// }
// .backdroundDiv {
// width: 100%;
// height:300px;
// background: black;
// position: relative;
// img{
//   width: 100%;
//   height: 100%;
// }
// .avatar{
//   border: 5px solid white;
//   position: absolute;
//   bottom: -60%;
//   left: 100px;
//   width: 300px;
//   height: 300px;
//   border-radius: 50%;
//   background: pink;
//   img{
//     width: 299px;
//     height: 299px;
//     border-radius: 50%;
//   }
// }
// }
// .nameDetail{
//   padding: 30px;
//   width: 50%;
//   margin-left: 450px;
// }
// `
export default Profile