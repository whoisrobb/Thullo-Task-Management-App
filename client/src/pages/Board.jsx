
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { serverUrl } from '../utils/urls'
import CardDetails from '../components/CardDetails'
import { useCard } from '../components/CardProvider'

const Board = () => {
    const { setToCard, toggleCard } = useCard()
    const { boardId } = useParams()

    const [listTitle, setListTitle] = useState('')
    const [cardTitle, setCardTitle] = useState('')
    const [board, setBoard] = useState(null)
    const [lists, setLists] = useState(null)
    const [create, setCreateList] = useState(false)
    const [listMenu, setListMenu] = useState({})
    const [cardMenu, setCardMenu] = useState({})
    const [cardModals, setCardModals] = useState({})

    useEffect(() => {
        fetchBoard()
        fetchLists()
        // createList()
    }, [boardId])

    const fetchBoard = async () => {
        try {
            const response = await fetch(`${serverUrl}/board/${boardId}`)
            const data = await response.json()
            setBoard(data)
            // console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchLists = async () => {
        try {
            const response = await fetch(`${serverUrl}/board/lists/${boardId}`)
            const data = await response.json()
            setLists(data)
        } catch (err) {
            console.error(err)
        }
    }

    // console.log(lists)

    const createList = async () => {
        try {
            const response = await fetch(`${serverUrl}/board/lists/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: listTitle, boardId })
            })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        console.log(cardMenu)
    }, [cardMenu])

    const createCard = async () => {
        try {
            const response = await fetch(`${serverUrl}/board/cards/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: cardTitle, listId: cardMenu })
            })
        } catch (err) {
            console.error(err)
        }
    }

  return (
    <section id='boards'>
        <div className="bar">
            {board && <h1>{board.title}</h1>}
        </div>
        <div className="actions">
            {lists &&
                lists.map((list) => (
                    <div key={list._id} className="list">
                        <div className="list-header">
                            <div className="list-content">
                                <p>{list.title}</p>
                                <div>
                                    
                                    <button className='card-menu' onClick={() => {
                                            setCardMenu(cardMenu === list._id ? null : list._id);
                                        }}
                                    >
                                        <i className="uil uil-plus"></i>
                                    </button>
                                    
                                    <button className='card-menu' onClick={() => {
                                            setListMenu(listMenu === list._id ? null : list._id);
                                        }}>
                                            <i className="uil uil-ellipsis-v"></i>
                                    </button>
                                </div>
                                {  listMenu === list._id &&
                                    <div className="list-menu-actions">
                                        <div className="list-menu-head">
                                            <p>List actions</p>
                                        </div>
                                        <Link to={`/card/${list._id}`}>create card</Link>
                                    </div>
                                }
                            </div>
                                {  cardMenu === list._id &&
                                    <div className="card-menu-actions">
                                        <form onSubmit={createCard}>
                                            <input
                                                type="text"
                                                name="cardTitle"
                                                placeholder='Enter title for the card'
                                                value={cardTitle}
                                                onChange={(e) => setCardTitle(e.target.value)}
                                            />
                                            <button type="submit">create card</button>
                                        </form>
                                    </div>
                                }
                        </div>
                            <div className="cards">
                                {
                                    list.cards.map((card) => (
                                        <div className='card' key={card._id} onClick={() => {
                                            setToCard(card);
                                            toggleCard();
                                            }}
                                        >
                                            <div className="head">
                                                <h3>{card.title}</h3>
                                                <button
                                                    className="toggle-modal"
                                                    onClick={() => {
                                                      setCardModals((prevModals) => ({
                                                        ...prevModals,
                                                        [card._id]: !prevModals[card._id],
                                                      }))
                                                    }}
                                                >
                                                    <i className="uil uil-ellipsis-v"></i>
                                                </button>
                                                
                                                {cardModals[card._id] && (
                                                    <div className="modal-toggle">
                                                        <Link to={'/'}>wsgood</Link>
                                                    </div>
                                                )}
                                            </div>

                                            {card.description && <div className='content' dangerouslySetInnerHTML={{ __html: card.description }} />}
                                            
                                            { card.labels.length >= 1 &&
                                                <ul className='label-list'>
                                                    {card.labels.map((label, index) => (
                                                        <li style={{ backgroundColor: label.color }} key={index} className="tag">
                                                            <span>
                                                            {label.name}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            }

                                            {card.checklists &&
                                                <ul>
                                                    {card.checklists.map((item, index) => (
                                                        <li key={index}>
                                                            <input
                                                                type="checkbox"
                                                                checked={item.checked}
                                                                readOnly
                                                            />
                                                            {item.text}
                                                        </li>
                                                    ))}
                                                </ul>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                    </div>
            ))}
            <div className="list">
                <div className="list-header">
                    <div className="create">
                        <p>Create new List</p>
                        <button className='create-list' onClick={() => setCreateList(prevValue => !prevValue)}>
                            <i className="uil uil-plus"></i>
                        </button>
                    </div>
                    {
                        create && 
                        <form onSubmit={createList}>
                            <input
                                type="text"
                                name="listTitle"
                                value={listTitle}
                                onChange={(e) => setListTitle(e.target.value)}
                            />
                            <button type="submit">create</button>
                        </form>
                    }
                </div>
            </div>
            {/* <button onClick={toggleCard}>toggle</button> */}
            <CardDetails />
        </div>
    </section>
  )
}

export default Board