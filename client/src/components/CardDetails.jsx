import React, { useState } from 'react'

const CardDetails = ({ listId }) => {
  const [toggle, setToggle] = useState(true)

  return (
    <div
      className='card-details'
      style={toggle ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)' }}
    >
        <div className="head">
          <h2 className="title"></h2>
          <button onClick={() => setToggle(false)}>
            <i className="uil uil-times"></i>
          </button>
        </div>
    </div>
  )
}

export default CardDetails