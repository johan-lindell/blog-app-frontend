import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'

const AddBlogForm = () => {
  const dispatch = useDispatch()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = (event) => {
    event.preventDefault()
    //creates blog object
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    dispatch(createBlog(blogObject))
    dispatch(setNotification(`Blog created: ${blogObject.title} by ${blogObject.author}`,'notification', 5000))

    title.reset()
    author.reset()
    url.reset()
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
              title:
          <input { ...title } reset={null}/>
        </div>
        <div>
              author:
          <input { ...author } reset={null}/>
        </div>
        <div>
              url:
          <input { ...url } reset={null}/>
        </div>
        <button id='submit-blog-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default AddBlogForm