import React from 'react'
import '../css/homepage.css'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <>
    
    <div className='homepage'>
        <div className='left'></div>
        <div className='right'>
            <div id='top'>Hey Buddy! New here</div>
            <div id='bottom'>Welcome to open blank page, this is one of the oldest ancient 
non organized society, designed to ruin your day, time and 
career.
<br/>
<div className='links'>
<Link to="/login">Login</Link>
<Link to="/signup">signup</Link>
</div>
</div>
        </div>
    </div>
 
    </>
  )
}
