import React, { useEffect, useState } from 'react'
import { serverUrl } from '../utils/urls'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'


const Login = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('activeCard')

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

            <div className="form-container">
                <p className="title">Login</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="value">Username or email</label>
                        <input
                            type="text"
                            name="value"
                            placeholder="username or e-mail"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            name="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="sign" type='submit'>Sign in</button>
                </form>
                <p className="signup">Don't have an account?
                    <Link to={'/register'} className="">Sign up</Link>
                </p>
            </div>
            
        </div>        
    </section>
  )
}

export default Login