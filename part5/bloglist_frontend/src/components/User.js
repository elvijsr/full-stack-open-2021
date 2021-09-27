import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const User = ({ id }) => {
  const [user, setUser] = useState(null)

  useEffect(async () => {
    const response = await userService.getAll()
    const user = response.find(user => user.id === id)
    setUser(user)
  },[])

  if (!user) {
    return null
  }


  return (
    <div>
      <h1>{user.name}</h1>
      <p>Added blogs:</p>
      {console.log(user.blogs)}
      {user.blogs.map(blog =>
        <li key={blog.id}>{blog.title}</li>
      )}
    </div>
  )

}

export default User