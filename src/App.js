import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notificaiton from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { login, logout, getUser } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'
import { useField } from './hooks'
import { BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Typography } from '@material-ui/core'

const App = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()

  const user = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  //initializing notes with redux
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUser())
    dispatch(getUsers())
  },[dispatch])

  const handleLogin = (event) => {
    event.preventDefault()
    try {
      dispatch(login(username.value, password.value))
      username.reset()
      password.reset()
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5000))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <Container>
      <Router>
        <Notificaiton />
        {user === null
          ? <LoginForm password={password} username={username}
            handleLogin={handleLogin}/>
          :
          <div>
            <AppBar position='static'>
              <Toolbar>
                <Button color="inherit" component={Link} to="/">
                  blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                  users
                </Button>
                <Button color='inherit' onClick={handleLogout}>
                  logout
                </Button>
              </Toolbar>
            </AppBar>
            <Typography variant='h2'>Blog App</Typography>
            <br />
            <Switch>
              <Route path='/users/:id'>
                <User users={users} />
              </Route>
              <Route path='/users'>
                <Users />
              </Route>
              <Route path='/blogs/:id'>
                <BlogView blogs={blogs} />
              </Route>
              <Route path='/'>
                <BlogList />
              </Route>
            </Switch>
          </div>}
      </Router>
    </Container>
  )
}

export default App