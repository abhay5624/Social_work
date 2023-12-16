import React, { useState } from 'react';
import { useLocal } from '../store/auth_context';
import '../css/signup.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom'
const LoginForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    email: "",
    phoneNo: "",
    password: ""
  });
  const {storTokeninLS} = useLocal();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const respond = await fetch("http://localhost:3001/api/auth/register",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      console.log(respond); 
      if(respond.ok){
        const data = respond.json();
        const store=localStorage.setItem("token", data.token);
        setUser({
          firstName: "",
          phoneNo: "",
          email: "",
          password: ""
        })
        navigate('/home')
      } 
    } catch (error) {
     console.log("from frontEnd :",error);  
    }
   
  };

  return (
    <div className="signup-container">
    
    <div className='signup'>

      <div className="signup-form">
        <h2>Sign Up</h2><br/>
        <div>Already have an account?<Link to="/login"> Login</Link></div><br/>
        <form onSubmit={()=>{handleLogin()}}>
          <label>
            <input
              type="text" placeholder='Username'
              name='firstName'
              value={user.firstName}
              onChange={(e) => setUser({...user, firstName: `${e.target.value}`})}
              className="input-field"
              />
          </label>
          <br />
          <label>
            <input
              type="number" placeholder='Phone number'
              name='phoneNo'
              value={user.phoneNo}
              onChange={(e) => setUser({...user, phoneNo: `${e.target.value}`})}
              className="input-field"
              />
          </label>
          <br />
          <label>
            <input
              type="text" placeholder='College Id'
              name= "email"
              value={user.email}
              onChange={(e) => setUser({...user, email: `${e.target.value}`})}
              className="input-field"
              required
              />
          </label>
          <label>
            <input
              type="text" placeholder='Password'
              value={user.password} name='password'
              onChange={(e) => setUser({...user, password: `${e.target.value}`})}
              className="input-field"
              />
          </label>
          <br />
          <br />
       
          <input type="submit" onClick={handleLogin} className="signup-button" placeholder='Register'>
            
          </input>
        </form>
      </div>
      <div className="signup-image-container">
        
      </div>
        </div>
      
    </div>
  );
};

export default LoginForm;
