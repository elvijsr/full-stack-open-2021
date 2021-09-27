import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const login = (event) => {
    event.preventDefault()
    dispatch(handleLogin({ username, password }))

    setUsername('')
    setPassword('')

  }

  return (
    <form onSubmit={login} id="login-form">
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )
}


export default LoginForm