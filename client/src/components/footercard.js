import React from 'react'
import '../css/footercard.css'
export default function Footercard(Props) {
  return (
    <div className='card'>
        <h5>Contact - {Props.phone}</h5>
        <h5>Email - {Props.email}</h5>
        <h5>{Props.name}</h5>
        <h5>{Props.caption}</h5>
    </div>
  )
}
