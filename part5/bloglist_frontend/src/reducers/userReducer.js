import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './messageReducer'


const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const checkToken = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'SET_USER',
        data: user
      })
      blogService.setToken(user.token)
    }
  }
}

export const handleLogin = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      dispatch({
        type: 'SET_USER',
        data: user
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }
}

export const handleLogout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'SET_USER',
      data: null
    })
    blogService.setToken(null)
  }
}

export default userReducer