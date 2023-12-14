import React, { useState } from 'react';
import '../css/loginform.css'; // Import the CSS file
import { Link } from 'react-router-dom'
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    console.log('Logging in with:', username, password);
  };

  return (
    <div className="login-container">
    
    <div className='login'>

      <div className="login-form">
        <h2>Login</h2><br/>
        <div>New to website?<Link to="/signup"> Create an account</Link></div><br/>
        <form>
          <label>
            <input
              type="text" placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              />
          </label>
          <br />
          <label>
            <input
              type="password" placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              />
          </label>
          <br />
          <br />
       
          <button type="button" onClick={handleLogin} className="login-button">
            Login
          </button>
        </form>
      </div>
      <div className="image-container">
        
      </div>
              </div>
      
    </div>
  );
};

export default LoginForm;
