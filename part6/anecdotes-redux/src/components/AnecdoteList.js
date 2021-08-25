import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const Anecdote = ({anecdote, handleClick}) => {
    return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const sortAnecdotes = (anecdotes) => {
      return anecdotes.sort((first, second) => second.votes - first.votes)
    }

    const voteAction = (anecdote) => {
      dispatch(voteAnecdote(anecdote.id))
      dispatch(setNotification(`voted for "${anecdote.content}"`, 5))
    }

    return (
    <ul>
      {sortAnecdotes(anecdotes).map(anecdote =>
        <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => voteAction(anecdote)}
        /> 
      )}
    </ul>
    )
}

export default Anecdotes