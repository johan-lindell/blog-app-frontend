import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notificaiton from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'

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
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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

  const addLike = async blog => {
    //creates a updated blog with one more like
    const newBlog = {
      user: blog.user._id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    //updates the database
    let response
    try {
      response = await blogService.update(blog.id, newBlog)
    } catch (e){
      console.log(e.response.data.error)
    }
    const updatedBlogs = blogs.map(b => {
      if (b.id === response.id) {
        b.likes = response.likes
      }
      return b
    })
    setBlogs(updatedBlogs)
  }

  const deleteBlog = async blog => {
    try {
      if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
        //removed blog from database
        await blogService.remove(blog.id)
        const updatedBlogs = blogs.map(b => {
          if (b.id !== blog.id) {
            return b
          }
          return null
        })
        setBlogs(updatedBlogs)
      }
    } catch (e) {
      console.log(e.response.data.error)
    }

  }

  return (
    <div>
      {user === null
        ? <LoginForm password={password} setPassword={setPassword} username={username} setUsername={setUsername}
          message={message} errorMessage={errorMessage} handleLogin={handleLogin}/>
        : <div>
          <h2>blogs</h2>
          <Notificaiton message={message} errorMessage={errorMessage} />
          <p>{user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="new blog">
            <AddBlogForm newUrl={newUrl} newTitle={newTitle} newAuthor={newAuthor}
              setNewAuthor={setNewAuthor} setNewTitle={setNewTitle} setNewUrl={setNewUrl} addBlog={addBlog}/>
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} deleteBLog={deleteBlog}
              userId={JSON.parse(window.localStorage.getItem('loggedBlogappUser')).id}/>

          )}
        </div>
      }
    </div>

  )
}

export default App