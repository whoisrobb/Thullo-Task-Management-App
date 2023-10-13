import React from 'react'
import { useCard } from './CardProvider'

const Button = () => {
    const { toggleSidebar, toggleBar } = useCard()

  return (
    <button onClick={toggleBar} className='toggle-sidebar'>
        {
            toggleSidebar ?
            <i className="uil uil-angle-left"></i>
            :
            <i className="uil uil-angle-right"></i>
        }
    </button>
  )
}

export default Button