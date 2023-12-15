import React, { useState } from 'react';
import '../css/signup.css'; // Import the CSS file
import { Link } from 'react-router-dom'
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
const [Phone, setPhone] = useState('')
  const handleLogin = () => {
    // Add your login logic here
    console.log('Logging in with:', username, password,collegeId);
  };

  return (
    <div className="signup-container">
    
    <div className='signup'>

      <div className="signup-form">
        <h2>Sign Up</h2><br/>
        <div>Already have an account?<Link to="/login"> Login</Link></div><br/>
        <form action='http://localhost:3001/api/auth/register' method='POST' >
          <label>
            <input
              type="text" placeholder='Username'
              name='firstName'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              />
          </label>
          <br />
          <label>
            <input
              type="number" placeholder='Phone number'
              name='phoneNo'
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
              />
          </label>
          <br />
          <label>
            <input
              type="text" placeholder='College Id'
              name= "email"
              onChange={(e) => setCollegeId(e.target.value)}
              className="input-field"
              required
              />
          </label>
          <label>
            <input
              type="password" placeholder='Password'
              value={password} name='password'
              onChange={(e) => setPassword(e.target.value)}
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
