import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const WorkspaceLayout = () => {
  
  return (
    <div id='app'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default WorkspaceLayout