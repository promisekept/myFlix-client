import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Signout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
        navigate("/")
    }, [])
    return null;
}

export default Signout