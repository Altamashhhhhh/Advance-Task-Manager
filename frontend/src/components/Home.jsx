import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

  return (
    <div>
      <button onClick={()=>navigate("/register")}>REGISTER HERE </button>
      <button onClick={()=>navigate("/login")}>LOGIN HERE  HERE </button>
    </div>
  )
}

export default Home
