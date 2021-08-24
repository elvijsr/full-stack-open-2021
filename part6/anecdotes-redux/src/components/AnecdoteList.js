import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const sortAnecdotes = (anecdotes) => {
      return anecdotes.sort((first, second) => second.votes - first.votes)
    }

    return (
    <ul>
      {sortAnecdotes(anecdotes).map(anecdote =>
        <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(voteAnecdote(anecdote.id))}
        /> 
      )}
    </ul>
    )
}

export default Anecdotes