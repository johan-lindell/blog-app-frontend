import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notificaiton from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    //getting browsers local storage
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    //creates blog object
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    //posts object to backend
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
        setMessage(null)
        }, 5000)

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
        const user = await loginService.login({
        username, password
      })

      //saving usert to browser's local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notificaiton message={message} errorMessage={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password
              <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const addBlogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
              <input type='text' value={newTitle} name='Title' onChange={({ target }) => setNewTitle(target.value)}/>
          </div>
          <div>
            author:
              <input type='text' value={newAuthor} name='Author' onChange={({ target }) => setNewAuthor(target.value)}/>
          </div>
          <div>
            url:
              <input type='text' value={newUrl} name='Url' onChange={({ target }) => setNewUrl(target.value)}/>
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {user === null
      ? loginForm()
      : <div>
          <h2>blogs</h2>
          <Notificaiton message={message} errorMessage={errorMessage} />
          <p>{user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          {addBlogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
    
  )
}

export default App