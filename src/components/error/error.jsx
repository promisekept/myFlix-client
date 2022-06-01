import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>PAGE NOT FOUND</h1>
            <button onClick={() => navigate("/")}>Go back</button>
        </>
    )
}

export default Error