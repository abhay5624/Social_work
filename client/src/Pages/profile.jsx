import React from 'react'
import '../css/profile.css';
import Profilecard from '../components/profilecard';

export default function Profile() {
  return (
    <>
    <div className='top-image'>

        <button>Contact +</button>
    </div>
    <div className="container">
      <div className="image">
       
      </div>
  

        <div className="description-container">
          <h1>Sudip Das</h1>
          <h3>Secratary of website</h3><br/>
          <p>
            This is an example description. You can replace this with your own content.
          </p>
          <p>
            This is an example description. You can replace this with your own content.
          </p>
          <p>
            This is an example description. You can replace this with your own content.
          </p>
          <p>
            This is an example description. You can replace this with your own content.
          </p>
      
      </div>
    </div>
    <h1>PROJECTS</h1><br/>
    <div className='projects'>
        <Profilecard />
        <Profilecard />
        <Profilecard />
    
    </div>
    <br/>
    <br/>
    <h1>CONTRIBUTIONS</h1><br/>
    <div className='projects'>
        <Profilecard />
        <Profilecard />
        <Profilecard />
    
    </div>
    <br/>
    <br/>

          </>

  )
}
