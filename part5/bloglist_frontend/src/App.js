import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [messageContent, setMessageContent] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    async function fetchData() {
      const response = await blogService.getAll()
      const sorted = response.sort((a,b) => {
        return b.likes - a.likes
      })
      setBlogs(sorted)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      setMessageType('error')
      setMessageContent('wrong username or password')
      setTimeout(() => {
        setMessageContent(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))

    setMessageType('added')
    setMessageContent(`a new blog ${response.title} by ${response.author} added`)

    setTimeout(() => {
      setMessageContent(null)
      setMessageType(null)
    }, 5000)
  }

  const likeBlog = async id => {
    const blog = blogs.find(n => n.id === id)
    const blogObject = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const response = await blogService.update(id, blogObject)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : response))
  }

  const deleteBlog = async id => {
    const response = await blogService.deleteBlog(id)
    if (response.status === 204) {
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={messageContent} type={messageType}/>
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs app</h2>
      <Notification message={messageContent} type={messageType}/>
      <p>{user.name} logged-in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}

      <h2>Blog list:</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}
          likeBlog={likeBlog} removeBlog={deleteBlog} user={user}/>
      )}
    </div>
  )
}

export default App