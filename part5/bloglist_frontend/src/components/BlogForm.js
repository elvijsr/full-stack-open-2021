import React, { useState } from 'react'


const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    }

    createBlog(newBlog)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')

  }

  return (
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
  )
}

export default BlogForm