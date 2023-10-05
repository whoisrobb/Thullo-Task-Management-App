import jwtDecode from 'jwt-decode'
import React, { createContext, useContext, useEffect, useState } from 'react'

const CardContext = createContext()

export const useCard = () => {
    return useContext(CardContext)
}

const CardProvider = ({ children }) => {
    const [cardItem, setCardItem] = useState(
        localStorage.getItem('activeCard') || []
    )

    const [access, setAccess] = useState(null)

    // let access

    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('accessToken')

        if (token) {
            const decoded = jwtDecode(token)
            setAccess(decoded)
        }

    }, [])

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
    <CardContext.Provider value={{ access, cardItem, toggle, toggleCard, setToCard }}>
        { children }
    </CardContext.Provider>
  )
}

export default CardProvider