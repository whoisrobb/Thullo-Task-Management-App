import React, { useEffect, useState } from 'react'
import { serverUrl } from '../utils/urls'

const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const formData = { firstName, lastName, username, email, password}
    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${serverUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch(`${serverUrl}/auth/users`)
            const data = await response.json()
            console.log(data)
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
                    name="firstName"
                    placeholder="first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                    type="text"
                    name="lastName"
                    placeholder="last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

export default Register