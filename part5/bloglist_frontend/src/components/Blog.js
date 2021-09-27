import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/messageReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
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
    const blogObject = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    dispatch(likeBlog(blog.id, blogObject))
    dispatch(setNotification(`liked "${blog.title}"`, 5))
  }

  const remove = () => {
    if (window.confirm('Delete this blog?')) {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification(`deleted "${blog.title}"`, 5))
    }
  }


  return (
    <div style={blogStyle} className='blog'>
      <div>
        <div>
          {blog.title} by {blog.author}
          <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        </div>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={like}>like</button></div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username && <button onClick={remove}>remove</button>}
      </div>
    </div>
  )
}

export default Blog