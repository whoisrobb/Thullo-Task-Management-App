import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  navigate('/login')

  return (
    <section id='home'>
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Register</Link>
    </section>
  )
}

export default Home