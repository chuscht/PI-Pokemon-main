import React from 'react'
import { Link } from 'react-router-dom'
import '../components/style-css/LandingPage.css'



export default function NewLandingPage() {
  return (
    <div className='landing-container'>
        <h1></h1>
       

        <div className='button-home-landing'><Link to='/home' style={{ textDecoration: 'none' , color: 'white' }} >Home</Link></div>
    </div>


  )
}
