import React from 'react'
import { useParams } from 'react-router-dom'
import { Typography, TableRow, Table, TableCell, TableHead, TableContainer, Paper } from '@material-ui/core'
const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if (!user) return null
  return(
    <>
      <Typography variant='h4'>{user.name}</Typography>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: 20 }} ><strong>Added blogs</strong></TableCell>
            </TableRow>
          </TableHead>
          {user.blogs.map(blog =>
            <TableRow key={blog.title}>
              <TableCell >{blog.title}</TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>

    </>
  )
}

export default User