import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/'} className='workspace'>
            <span>R</span>
            <div>
                <h2>Robert Muchiri's</h2>
                <p>workspace</p>
            </div>
        </Link>
        <nav>
            <Link to={'/board/:userId'}>
                <i className="uil uil-create-dashboard"></i>
                board
            </Link>
            <Link to={'/members'}>
                <i className="uil uil-user"></i>
                members
            </Link>
            <Link to={'/board/:userId'}>
                <i className="uil uil-setting"></i>
                workspace settings
            </Link>
        </nav>
        <div className="boards">
            <div className='actions'>
                <h3>Your boards</h3>
                <button>
                    <i className="uil uil-plus"></i>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Sidebar