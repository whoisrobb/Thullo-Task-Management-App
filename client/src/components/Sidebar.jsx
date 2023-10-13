import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { serverUrl } from '../utils/urls'
import jwtDecode from 'jwt-decode'
import { useCard } from './CardProvider'

const Sidebar = ({ userId }) => {
    const { access, toggleSidebar } = useCard()
    const navigate = useNavigate()

    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [boards, setBoards] = useState(null)
    const [deleteBoard, setDeleteBoard] = useState(false)
    const [cardModals, setCardModals] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            const decoded = jwtDecode(token)
            const userId = decoded.id
            fetchBoards(userId)
        }
    }, [])

    const fetchBoards = async (id) => {
        try {
            const response = await fetch(`${serverUrl}/board/all/${id}`)
            const data = await response.json()
            setBoards(data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = { title, description, createdBy: access.id }
        console.log(formData)
        console.log(access.id)

        try {
            const response = await fetch(`${serverUrl}/board/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                const responseData = await response.json()
                setModal(false);
                navigate(`/workspace/boards/${responseData._id}`)
            } else {
                console.error(response.status, response.statusText);
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (boardId) => {
        try {
            const response = await fetch(`${serverUrl}/board/${boardId}`, {
                method: 'DELETE',
            })
            
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            const res = await response.json(response)
            console.log(res)

        } catch (err) {
            console.error(err)
        }
    }

  return (
    <div className='sidebar'
        style={
            toggleSidebar ?
            // { transform: 'scaleX(1)' }
            { display: 'block' }
            :
            // { transform: 'scaleX(0)' }
            { display : 'none' }
        }
    >
        <Link to={'/'} className='workspace'>
            <span>R</span>
            <div>
                { access && <h2>{access.username}'s</h2>}
                <p>workspace</p>
            </div>
        </Link>
        {access &&
            <nav> 
                <Link to={`/workspace/${access.id}`}>
                    <i className="uil uil-create-dashboard"></i>
                    board
                </Link>
                <Link to={`/workspace/${access.id}`}>
                    <i className="uil uil-user"></i>
                    members
                </Link>
                <Link to={`/workspace/${access.id}`}>
                    <i className="uil uil-setting"></i>
                    workspace settings
                </Link>
            </nav>
        }
        <div className="boards">
            <div className='actions'>
                <h3>Your boards</h3>
                <button className='toggle-modal' onClick={() => setModal(prevModal => !prevModal)}>
                    <i className="uil uil-plus"></i>
                </button>
                <div
                    style={modal ? { display: 'block' } :  { display: 'none' }}
                    className="create-board"
                >
                    <form onSubmit={handleSubmit} style={{ zIndex: '99999' }}>
                        <p className='header'>create board</p>
                        <p>Input board title</p>
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <p className='NB'>board title is required</p>
                        
                        <p>Input board description</p>
                        <input
                            type="text"
                            name="description"
                            placeholder="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button type="submit">create</button>
                    </form>
                </div>
            </div>
            <div className="board-links">
                { boards &&
                    <nav className='board-links-list'>
                        {boards.map((board) => (
                            <div className='link-item' style={{ position: 'relative' }} key={board._id}>
                                <Link to={`/workspace/boards/${board._id}`} className='board-link'>
                                        {board.title}
                                </Link>
                                <button className='toggle-modal' onClick={() => {
                                            setCardModals(cardModals === board._id ? null : board._id);
                                        }}>
                                    <i className="uil uil-ellipsis-v"></i>
                                </button>
                                {  cardModals === board._id &&
                                    <div className="modal-toggle">
                                        {
                                            deleteBoard ?
                                            <>
                                                <p>Are you sure you want to delete?</p>
                                                <form onSubmit={() => handleDelete(board._id)}>
                                                    <button type='submit'>
                                                        confirm delete
                                                    </button>
                                                </form>
                                            </>
                                            :
                                            <div className="list-menu-head">
                                                <button onClick={() => setDeleteBoard(true)}>delete board</button>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        ))}
                    </nav>
                }
            </div>
        </div>
    </div>
  )
}

export default Sidebar