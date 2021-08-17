import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [messageContent, setMessageContent] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    async function fetchData() {
      const response = await blogService.getAll()
      setBlogs(response)
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setMessageType('error')
      setMessageContent(`wrong username or password`)
      
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    }

    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response))
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')

    setMessageType('added')
    setMessageContent(`a new blog ${response.title} by ${response.author} added`)
    
    setTimeout(() => {
      setMessageContent(null)
      setMessageType(null)
    }, 5000)
  }


  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title:
          <input
            type="title"
            name="title"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
      </div>

      <div>
        Author: 
          <input
            type="author"
            name="author"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
      </div>

      <div>
        URL:
        <input
          type="url"
          name="url"
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>

      <button type="submit">save</button>
    </form>  
  )

  const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={type}>
        {message}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={messageContent} type={messageType}/>
        {loginForm()}
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
      <h2>create new</h2>
      {blogForm()}

      <h2>Blog list:</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App