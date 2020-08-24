import React from 'react'
import { TextField, Button, Typography } from '@material-ui/core'
const LoginForm = ({
  handleLogin,
  username,
  password
}) => {
  return (
    <div className='login'>
      <Typography variant='h4' >Log in to application</Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField label="username" { ... username } reset={null}/>
        </div>
        <div>
          <TextField label="password" { ...password } reset={null}/>
        </div>
        <br />
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm