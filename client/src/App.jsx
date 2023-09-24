import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Workspace from './pages/Workspace'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
      </Routes>

      <div id='app'>
        <Sidebar />
        <div className="wrapper">
          <Routes>
            <Route path='/workspace/:userId' element={<Workspace />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
