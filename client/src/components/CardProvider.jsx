import React, { createContext, useContext, useEffect, useState } from 'react'

const CardContext = createContext()

export const useCard = () => {
    return useContext(CardContext)
}

const CardProvider = ({ children }) => {
    const [cardItem, setCardItem] = useState(
        // JSON.parse(localStorage.getItem('activeCard')) || []
        localStorage.getItem('activeCard') || []
    )

    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        localStorage.setItem('activeCard', JSON.stringify(cardItem))
    }, [cardItem])

    const toggleCard = () => {
        setToggle(prevToggle => !prevToggle)
    }

    const setToCard = (cardId) => {
        setCardItem(cardId)
    }

  return (
    <CardContext.Provider value={{ cardItem, toggle, toggleCard, setToCard }}>
        { children }
    </CardContext.Provider>
  )
}

export default CardProvider