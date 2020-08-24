import React from 'react'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import AddBlogForm from './AddBlogForm'
import { Link } from 'react-router-dom'
import { TableContainer, TableCell, TableBody, Table, Paper, TableRow } from '@material-ui/core'
const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  return (
    <>
      <Togglable buttonLabel="new blog">
        <AddBlogForm />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog =>
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`} variant='body1' >{blog.title}</Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default BlogList