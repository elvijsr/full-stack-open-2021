import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {
    likeBlog(blog.id)
  }

  const remove = () => {
    if (window.confirm('Delete this blog?')) {
      removeBlog(blog.id)
    }
  }


  return (
    <div style={blogStyle}>
      <div>
        <div>
          {blog.title} by {blog.author}
          <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={like}>like</button></div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username && <button onClick={remove}>remove</button>}
      </div>
    </div>
  )
}

export default Blog