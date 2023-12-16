import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/loginform.css'; // Import the CSS file
import { Link } from 'react-router-dom'
import { useLocal } from '../store/auth_context';
const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const {storTokeninLS} = useLocal(); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const respond = await fetch("http://localhost:3001/api/auth/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      console.log("login form: ",respond);
      if(respond.ok){
        const data = await respond.json();
        console.log(data);
        storTokeninLS(data.token);
        setUser({
          email: "",
          password: ""
        })
        navigate('/home')
      };  
    } catch (error) {
     console.log("from frontEnd :",error);  
    }
  };

  return (
    <div className="login-container">
    
    <div className='login'>

      <div className="login-form">
        <h2>Login</h2><br/>
        <div>New to website?<Link to="/signup"> Create an account</Link></div><br/>
        <form onSubmit={() => {handleLogin()}}>
          <label>
            <input
              type="email" placeholder='Email'
              value={user.email}
              onChange={(e) => setUser({...user, email: `${e.target.value}`})}
              className="input-field"
              />
          </label>
          <br />
          <label>
            <input
              type="password" placeholder='Password'
              value={user.password}
              onChange={(e) => setUser({...user, password: `${e.target.value}`})}
              className="input-field"
              />
          </label>
          <br />
          <br />
       
          <input type="submit" onClick={handleLogin} className="login-button" placeholder='Login'/>
        </form>
      </div>
      <div className="image-container">
        
      </div>
              </div>
      
    </div>
  );
};

export default LoginForm;
