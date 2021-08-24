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

export const messageChange = message => {
    return {
        type: 'SET_MESSAGE',
        message,
    }
}

export const messageRemove = () => {
    return {
        type: 'REMOVE_MESSAGE'
    }
}

export default messageReducer