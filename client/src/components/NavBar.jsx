import React from 'react'
import './style-css/NavBar.css'
import { Link } from 'react-router-dom';

export default function NewNavBar() {
    return (
        <div className='new-navbar-container'>
            <Link to='/'>
                <div className="logo-container">
                    Pokemon
                </div>
            </Link>
            <div className="menu-bar">
                <Link to='/home'>
                <div className="logo-container-home">
                    Home
                </div>
                </Link>
                <Link to='/createpoke'>
                <div className="logo-container-create">
                   Create Pokemon
                </div>
                </Link>

            </div>
        </div>
    )
}
