import React, { useEffect, useState } from 'react'
import { serverUrl } from '../utils/urls'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

const Workspace = () => {
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
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

  return (
    <section id='workspace'>
        <Button />
        <div className="boards">
            {boards && 
                    boards.map((board) => (
                        <Link key={board._id} to={`/workspace/boards/${board._id}`} className='board-link'>
                            <div className="box">{board.title}</div>
                        </Link>
                    ))
            }
        </div>
    </section>
  )
}

export default Workspace