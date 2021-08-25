import React from 'react'
import { connect } from 'react-redux' 
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
  
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setNotification(`anecdote '${content}' added`, 3)
    }
  
    return (
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    )
  }
  
  export default connect(
    null, 
    { createAnecdote, setNotification }
  )(AnecdoteForm)