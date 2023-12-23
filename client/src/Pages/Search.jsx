import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useLocal } from '../store/auth_context'
import styled from 'styled-components'
const Search = () => {
  const {userProfile} = useLocal();
  const {Data} = useLocal();
  const [Search, setSearch] = useState();
  const [tag,setTag]  = useState();
  const [userName, setUserName] = useState();
  const [searchposts , setSearchPosts] = useState();
  const SearchByDate =()=> {

  }
  const SearchByTag = async(e) => {
    e.preventDefault();
    try {
      const tkn = localStorage.getItem("token")
      const respond = await fetch(`http://localhost:3001/api/auth/searchPost?tag=${tag}`,{
          headers: {
            Authorization: `Bearer ${tkn}`
          }
      });
      if(respond.ok){
        const data = await respond.json();
        setSearchPosts(await data.postTag);
        console.log(data.postTag);
        setTag("");
      }else{
        console.log("post not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const HandleSearch = async(e) => {
      e.preventDefault();
      try {
        const respond = await fetch(`http://localhost:3001/api/auth/searchPerson?name=${userName}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        if(respond.ok){
          const data = await respond.json();
          console.log(data)
          setSearch(data);
        }else{
          setSearch("");
        }
        
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <AdvSrch style={{minHeight: "80vh"}}>
      <Sidebar/>
      <div style={{width: "100%"}}>
        <div style={{position: "relative", width: "100%", height: "300px"}}>
          <img src={userProfile.background} style={{margin:"0",width: "105%",height: "100%", position: "absolute", top: "0",left: "-5%"}} alt="" />
        <h2 style={{position: "absolute",bottom: "20px",left: "40px",color: "white"}}>Advance Search</h2>

        </div>
        {/* <button>Student</button>
        <button>Post</button> */}
        <div style={{display: "flex",width: "100%"}}>
        <div style={{width: "50%"}}> 
          <h3>Search a Student</h3>
          <form >
              <input type="text" name="searchValue" placeholder='Enter username' value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
              <button type="submit" onClick={(e)=> {HandleSearch(e)}}>Search</button>
          </form>
          {Search ?  
          <div className="profile">
              {Search.PostToSend?<img src={Search.PostToSend.avatar} alt="" style={{width: "200px",height: "200px",borderRadius: "50%"}}/>: ""}
              {Search.User?<h3 style={{display: 'flex',alignItems: 'center'}}>{Search.User.firstName}</h3>:""}
              {Search.PostToSend? <p style={{gridColumn: "span 2"}}>{Search.PostToSend.discription}</p> : ""} 
              {Search.User?<button style={{gridColumn: "span 2"}}>Check Profile</button>:""}
          </div>:""}
         
        </div>
        <div style={{width: "50%"}}>
          <h3>Search a Post</h3>
          <form >
              <input type="text" name="searchValue" placeholder='Enter Title'/>
              <button type="submit">Search</button>
          </form>
          <form onSubmit={(e) => {SearchByTag(e)}}>
              <input type="text" name="searchValue" placeholder='Enter Tag' value={tag} onChange={(e) => {setTag(e.target.value)}}/>
              <button type="submit" onChange={(e) => {SearchByTag(e)}}>Search</button>
          </form>
          <div className='tags'>
            <div className="tag" onClick={() => {SearchByDate()}}>This Month</div>
            <div className="tag" onClick={() => {SearchByDate()}}>This Year</div>
            <div className="tag" onClick={() => {SearchByDate()}}>Today</div>
          </div>
          {
            searchposts ? searchposts.map((e) => 
                (<div className='post'>
                  <img src={e.postImg} alt="" />
                  <div className='content'>
                  <h3>{e.title}</h3>
                  <p>{e.description}</p>{
                    e.tags ? e.tags.map((tg) => (
                      <button style={{margin: "5px"}}>{tg}</button>
                    )): ""
                  }
                  </div>
                </div>
            )): ""
          }
        </div>
        </div>
    </div>
    </AdvSrch>
  )
}
const AdvSrch = styled.div`
display:flex;
.profile{
  padding: 10px;
  width: 400px;
  display: grid;
  grid-template-columns: 200px;

}
.tags{
  display: flex;
  flex-wrap: wrap;
}
.post{
  display: flex;
  padding: 10px;
  .content{
padding: 20px;
  }
  img{
    width: 300px;
    border-radius: 5px;
  }

}
.tag{
  border: 1px solid black;
  border-radius: 3px;
  padding: 10px;
  margin: 5px;
  &:hover{
    color: white;
    background: #190582;
  }
}
h3{
  margin: 10px;
}
input{
  padding: 10px;
  width: 70%;
  margin: 10px;
}
button{
  padding: 10px;
  color: white;
  background: #190582;
  color: white;
  border-radius: 3px;
  border: none;
  &:hover{
    border: 1px solid #190582;
    color: #190582;
    background: white;
  }
}
`;
export default Search