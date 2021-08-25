import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteFor = async (id) => {
  const anecdote1 = await axios.get(`${baseUrl}/${id}`)
  const anecdoteToChange = anecdote1.data
  const changedAnecdote = { 
    ...anecdoteToChange, 
    votes: anecdoteToChange.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  return response.data
}


  
export default {
 getAll,
 createNew,
 voteFor
}