import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { messageChange, messageRemove } from '../reducers/messageReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
  
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log(content)
        const newAnecdote = await anecdoteService.createNew(content)
        console.log(newAnecdote)
        dispatch(createAnecdote(newAnecdote))
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