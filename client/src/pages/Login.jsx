import React, { useEffect, useState } from 'react'
import { serverUrl } from '../utils/urls'
import { Navigate, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'


const Login = () => {
    localStorage.removeItem('accessToken')

    const [value, setValue] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)
    const navigate = useNavigate()

    const formData = { value, password }
    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${serverUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then((response) => {
                if (response.ok) {
                    console.log('success')
                }
                return response.json()
            })
            .then((data) => {
                const token = data.token
                localStorage.setItem('accessToken', token)
                const decoded = jwtDecode(token)

                navigate(`/workspace/${decoded.id}`)
            })
        } catch (err) {
            console.error(err)
        }
    }

  return (
    <section id='register'>
        <div className="wrapper">
            <form
            onSubmit={handleSubmit}
            >
                
                <input
                    type="text"
                    name="value"
                    placeholder="username or e-mail"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <input
                    type="text"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">send</button>
            </form>
        </div>        
    </section>
  )
}

export default Login