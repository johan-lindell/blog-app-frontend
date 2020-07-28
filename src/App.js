import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notificaiton from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import { initializeBlogs, createBlog, deleteBlog, likeBlog } from './reducers/blogReducer'

const App = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)


  //OLD WAY OF INITIALIZING NOTES
  //useEffect(() => {
  //blogService.getAll().then(blogs =>
  //setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
  //)
  //}, [])

  //initializing notes with redux
  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

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

    dispatch(createBlog(blogObject))

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
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

  const handleLike = blog => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = blog => {
    dispatch(deleteBlog(blog))
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
            <Blog key={blog.id} blog={blog} addLike={handleLike} deleteBlog={handleDelete}
              user={JSON.parse(window.localStorage.getItem('loggedBlogappUser'))}/>

          )}
        </div>
      }
    </div>

  )
}

export default App