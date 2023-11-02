
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { serverUrl } from '../utils/urls'
import CardDetails from '../components/CardDetails'
import { useCard } from '../components/CardProvider'
import Button from '../components/Button'

const Board = () => {
    const { toggle, setToCard, toggleCard } = useCard()
    const { boardId } = useParams()

    const [listTitle, setListTitle] = useState('')
    const [cardTitle, setCardTitle] = useState('')
    const [board, setBoard] = useState(null)
    const [lists, setLists] = useState(null)
    const [deleteCard, setDeleteCard] = useState(false)
    const [deleteList, setDeleteList] = useState(false)
    const [create, setCreateList] = useState(false)
    const [listMenu, setListMenu] = useState({})
    const [cardMenu, setCardMenu] = useState({})
    const [cardModals, setCardModals] = useState({})

    useEffect(() => {
        fetchBoard()
        fetchLists()
    }, [boardId, toggle])

    const [openModalId, setOpenModalId] = useState(null);

    // // Function to close the modal
    // const closeCurrentModal = () => {
    //   setOpenModalId(null);
    // };
    
    // // Add an event listener to detect clicks outside of modals
    // useEffect(() => {
    //   const handleOutsideClick = (e) => {
    //     // Check if a modal is open and if the click target is outside of it
    //     if (openModalId && e.target.closest('.modal-content') === null) {
    //       closeCurrentModal();
    //     }
    //   };
    
    //   document.addEventListener('click', handleOutsideClick);
    
    //   return () => {
    //     document.removeEventListener('click', handleOutsideClick);
    //   };
    // }, [openModalId]);
      

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

    const createList = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${serverUrl}/board/lists/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: listTitle, boardId })
            })
            if (response.ok) {
                fetchLists()
                setCreateList(false)
            } else {
                console.error(response.status, response.statusText);
            }
        } catch (err) {
            console.error(err)
        }
    }

    // useEffect(() => {
    //     console.log(cardMenu)
    // }, [cardMenu])

    const createCard = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${serverUrl}/board/cards/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: cardTitle, listId: cardMenu })
            })
            if (response.ok) {
                fetchLists()
                setCardMenu(false)
            } else {
                console.error(response.status, response.statusText);
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleDeleteCard = async (cardId) => {
        try {
            const response = await fetch(`${serverUrl}/board/cards/${cardId}`, {
                method: 'DELETE',
            })
            
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            fetchLists()
            const res = await response.json(response)
            console.log(res)
        } catch (err) {
            console.error(err)
        }
    }

    const handleDeleteList = async (listId) => {
        try {
            const response = await fetch(`${serverUrl}/board/lists/${listId}`, {
                method: 'DELETE',
            })
            
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            fetchLists()
            const res = await response.json(response)
            console.log(res)
        } catch (err) {
            console.error(err)
        }
    }

  return (
    <section id='boards'>
        <Button />
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
                                    <>
                                        <div className="modal-toggle">
                                        {
                                            deleteList ?
                                            <form onSubmit={(e) => {e.preventDefault(); handleDeleteList(list._id)}}>
                                                <p>Are you sure you want to delete?</p>
                                                <button type='submit'>
                                                    confirm delete
                                                </button>
                                            </form>
                                            :
                                            <div className="list-menu-head">
                                                <button onClick={() => setDeleteList(true)}>delete list</button>
                                            </div>
                                        }
                                        </div>
                                    </>
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
                                                    <>
                                                        <div className="modal-toggle">
                                                        {
                                                            deleteCard ?
                                                            <form onSubmit={(e) => {e.preventDefault(); handleDeleteCard(card._id)}}>
                                                                <p>Are you sure you want to delete?</p>
                                                                <button type='submit'>
                                                                    confirm delete
                                                                </button>
                                                            </form>
                                                            :
                                                            <div className="list-menu-head">
                                                                <button onClick={() => setDeleteCard(true)}>delete card</button>
                                                            </div>
                                                        }
                                                        </div>
                                                    </>
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

                                            {card.checklists.length >= 1 &&
                                                <ul>
                                                    <h3>to do lists</h3>
                                                    {card.checklists.map((item, index) => (
                                                        
                                                        <li key={index}>
                                                            <label className="checkbox-container">
                                                                <input className="custom-checkbox" checked={item.checked} readOnly type="checkbox" />
                                                                <span className="checkmark"></span>
                                                                {item.text}
                                                            </label>
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
            {/* <CardDetails /> */}
        </div>
    </section>
  )
}

export default Board