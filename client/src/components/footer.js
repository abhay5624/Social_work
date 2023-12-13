import React from 'react'
import Footercard from './footercard'
import '../css/footer.css'
import { SocialIcon } from 'react-social-icons'
export default function Footer() {
  return (
   <>
    <div className='footer'>
      <div className='details'>
        
        <Footercard phone="1234567890" email="abc@gmail.com" name="hello hii byebye " caption="sudeepbhai"/>
        <Footercard phone="1234567890" email="abc@gmail.com" name="hello hii byebye " caption="sudeepbhai"/>
        <Footercard phone="1234567890" email="abc@gmail.com" name="hello hii byebye " caption="sudeepbhai"/>
        <Footercard phone="1234567890" email="abc@gmail.com" name="hello hii byebye " caption="sudeepbhai"/>
      </div>
        <div className='social_credentials'>  

    <div><SocialIcon url={"www.facebook.com"}/></div>
    <div><SocialIcon url={"www.twitter.com"}/></div>
    <div><SocialIcon url={"www.youtube.com"}/></div>
    <div><SocialIcon url={"www.instagram.com"}/></div>
        </div>
    </div>
   </> 
  )
}
