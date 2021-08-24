import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { messageChange, messageRemove } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
  
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(messageChange(`anecdote added`))
        setTimeout(() => {
          dispatch(messageRemove())
        }, 5000)
    }
  
    return (
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    )
  }
  
  export default AnecdoteForm