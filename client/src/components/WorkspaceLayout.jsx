import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import CardDetails from './CardDetails'
import Header from './Header'

const WorkspaceLayout = () => {
  
  return (
    <>
      <Header />
      <div id='app'>
        <Sidebar />
        <Outlet />
        <CardDetails />
      </div>
    </>
  )
}

export default WorkspaceLayout