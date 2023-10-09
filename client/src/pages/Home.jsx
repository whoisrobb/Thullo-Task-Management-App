import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section id='home'>
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Register</Link>
    </section>
  )
}

export default Home