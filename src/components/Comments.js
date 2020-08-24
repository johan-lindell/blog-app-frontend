import React from 'react'
import { useField } from '../hooks'
import { commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const newComment = useField('text')
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, newComment.value))
    newComment.reset()
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input { ...newComment } reset={null}></input>
        <button type='submit' >add comment</button>
      </form>
      <ul>
        {blog.comments.map(c => <li key={c}>{c}</li>)}
      </ul>
    </div>
  )
}

export default Comments