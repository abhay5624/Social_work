import React from 'react'
import { useLocal } from '../store/auth_context'
import Avatar from "../Assets/Image/avatar.jpg"
import styled from 'styled-components';
import Post from '../components/Post';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const {Data} = useLocal();
    const {userProfile} = useLocal();
    console.log("from profile: ",Data);
    const Navigate = useNavigate();
  return (
    <ProfileDiv>
        <div className="backdroundDiv">
          <img src={(userProfile.background)? userProfile.background : ""} alt="" />
          <div className="avatar"><img src={(userProfile.avatar)? userProfile.avatar: Avatar} alt="We need your profile" /></div>
        </div>
        <div className="nameDetail">
          <div className="flexbox">
          <h2>{Data.firstName}</h2>
          <button onClick={() => {Navigate('/updateProfile')}}>Edit Profile</button>
          </div>
          <p style={{fontWeight: 600,fontSize: "20px"}}>{Data.email.split("@nitjsr.ac.in")}</p>
          <p style={{fontWeight: 500}}>{userProfile.headLine}
            </p>
          <p>{userProfile.discription}</p>
          <p>{Data.email}</p>
        </div>
        <Post />
    </ProfileDiv>
  )
}
const ProfileDiv = styled.div`
.flexbox{
  display: flex;
  justify-content: space-between;
  button {
    padding: 10px 30px;
    color: white;
    background: #190582;
    border: none;
    border-radius: 5px;
    font-size: 15px;
  }
}
.backdroundDiv {
width: 100%;
height:300px;
background: black;
position: relative;
img{
  width: 100%;
  height: 100%;
}
.avatar{
  border: 5px solid white;
  position: absolute;
  bottom: -60%;
  left: 100px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: pink;
  img{
    width: 299px;
    height: 299px;
    border-radius: 50%;
  }
}
}
.nameDetail{
  padding: 30px;
  width: 50%;
  margin-left: 450px;
}
`
export default Profile