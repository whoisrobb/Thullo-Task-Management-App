import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { serverUrl } from '../utils/urls'
import jwtDecode from 'jwt-decode'
import { useCard } from './CardProvider'

const Sidebar = ({ userId }) => {
    const { access } = useCard()
    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [boards, setBoards] = useState(null)

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
            // console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    const formData = { title, description, createdBy: userId }

    const handleSubmit = async (e) => {
        try {
            const response = await fetch(`${serverUrl}/board/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then((response) => {
                if (response.ok) {
                    setModal(false)
                }
            })
        } catch (err) {
            console.error(err)
        }
    }

  return (
    <div className='sidebar'>
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
                    <form onSubmit={handleSubmit}>
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
                            <div className='link-item' key={board._id}>
                                <Link to={`/workspace/boards/${board._id}`} className='board-link'>
                                        {board.title}
                                </Link>
                                <button className='toggle-modal'>
                                    <i className="uil uil-ellipsis-v"></i>
                                </button>
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