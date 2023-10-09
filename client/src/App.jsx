import { useEffect, useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Register from './pages/Register'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Workspace from './pages/Workspace'
import Board from './pages/Board'
import CardDetails from './components/CardDetails'
import WorkspaceLayout from './components/WorkspaceLayout'
import CardProvider from './components/CardProvider'
import Test from './pages/Test'

function App() {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      const decodeToken = jwtDecode(token)
      setUserId(decodeToken.id)
      console.log(userId)
    }
  }, [])

  return (
    <CardProvider>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='test' element={<Test />} />

          <Route path='workspace' element={<WorkspaceLayout />} >
            <Route path=':userId' element={<Workspace />} />
            <Route path='boards/:boardId' element={<Board />} />
            <Route path='card-details/:list-id' element={<CardDetails />} />
          </Route>
        </Route>

      </Routes>
    </CardProvider>
  )
}

export default App
