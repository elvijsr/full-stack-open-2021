import React, { useState, useRef } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/messageReducer'
import Togglable from './Togglable'


const BlogForm = () => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    }

    dispatch(createBlog(newBlog))
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5))
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')

  }

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="title"
            name="title"
            id="title-input"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>

        <div>
          Author:
          <input
            type="author"
            name="author"
            id="author-input"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>

        <div>
          URL:
          <input
            type="url"
            name="url"
            id="url-input"
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>

        <button type="submit">save</button>
      </form>
    </Togglable>
  )
}

export default BlogForm