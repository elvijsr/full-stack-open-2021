import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { checkToken, handleLogout } from './reducers/userReducer'
import {
  Switch,
  Route,
  //Link,
  //Redirect,
  useRouteMatch,
  //useHistory,
} from 'react-router-dom'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const match = useRouteMatch('/users/:id')
  const userId = match
    ? match.params.id
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    dispatch(checkToken())
  }, [])

  const logOut = (event) => {
    event.preventDefault()
    dispatch(handleLogout())
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }


  return (
    <div>
      <h2>blogs app</h2>
      <Notification />
      <p>{user.name} logged-in
        <button onClick={logOut}>logout</button>
      </p>

      <Switch>
        <Route path="/users/:id">
          <User id={userId} />
        </Route>
        <Route path="/users">
          <h1>Users</h1>
          <UserList />
        </Route>
        <Route path="/">
          <BlogForm />
          <h2>Blog list:</h2>
          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}

export default App