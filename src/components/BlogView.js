import React from 'react'
import Comments from './Comments'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const BlogView = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const dispatch = useDispatch()
  if (!blog) return null

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes} likes
        <button id='like-button' onClick={() => dispatch(likeBlog(blog))}>like</button><br />
      added by {blog.author}

      </div>
      <Comments blog={blog} />
    </div>
  )
}

export default BlogView
