import React, { useEffect, useState } from 'react'
import { useCard } from './CardProvider'
import { serverUrl } from '../utils/urls'

const CardDetails = () => {
  const { toggle, cardItem } = useCard()
  const [cardDetails, setCardDetails] = useState(null)
  const [cardData, setCardData] = useState(null)

  useEffect(() => {
    const active = localStorage.getItem('activeCard')
    setCardDetails(active)

    if (cardDetails) {
      fetchCardDetails()
    }
  }, [cardItem])

  const fetchCardDetails = async () => {
    try {
      const response = await fetch(`${serverUrl}/board/cards/${cardDetails}`)
      const data = await response.json()
      setCardData(data)
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div
      className='card-details'
      style={toggle ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)' }}
    >
        <div className="head">
          <h2 className="title">{cardData && cardData.title}</h2>
          {/* <button onClick={() => setToggle(false)}>
            <i className="uil uil-times"></i>
          </button> */}
        </div>
    </div>
  )
}

export default CardDetails