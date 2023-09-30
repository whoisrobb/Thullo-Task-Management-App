
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { serverUrl } from '../utils/urls'
import CardDetails from '../components/CardDetails'

const Board = () => {
    const { boardId } = useParams()

    const [listTitle, setListTitle] = useState('')
    const [board, setBoard] = useState(null)
    const [lists, setLists] = useState(null)
    const [create, setCreateList] = useState(false)
    const [listMenu, setListMenu] = useState(false)

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
            // console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    // const fetchCards = async () => {
    //     try {
    //         const response = await fetch(`${serverUrl}/board/lists/${boardId}`)
    //         const data = await response.json()
    //         setLists(data)
    //         // console.log(data)
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

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

    const createCard = async () => {
        try {
            const response = await fetch(`${serverUrl}/board/cards/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: cardTitle, description: cardDescription, listId, createdBy })
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
                                <button className='list-menu' onClick={() => setListMenu(prevValue => !prevValue)}>
                                    <i className="uil uil-ellipsis-v"></i>
                                </button>
                                {  listMenu &&
                                    <div className="list-menu-actions">
                                        <div className="list-menu-head">
                                            <p>List actions</p>
                                        </div>
                                        <Link to={`/card/${list._id}`}>create card</Link>
                                    </div>
                                }
                            </div>
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
            <CardDetails />
        </div>
    </section>
  )
}

export default Board