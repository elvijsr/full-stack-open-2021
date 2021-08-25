const messageReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_MESSAGE':
        return action.message
      case 'REMOVE_MESSAGE':
        return null
      default:
        return state
    }
}

let timerId

export const setNotification = (message, duration) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      message
    })
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE'
      })
    }, duration * 1000)
  }
}

export const messageRemove = () => {
    return {
        type: 'REMOVE_MESSAGE'
    }
}

export default messageReducer