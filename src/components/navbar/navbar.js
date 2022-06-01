import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ user }) => {
    return (
        <nav>
            {user ?
                <>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/profile-view'>Profile</NavLink>
                    <NavLink to='/signout'>Sign out</NavLink>
                </> : <>
                    <NavLink to='/signup'>Sign up</NavLink>
                </>
            }
        </nav>
    )
}

export default Navbar