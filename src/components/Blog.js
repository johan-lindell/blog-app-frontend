import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenDeleted = { display: deleted ? 'none' : ''}

  
  const sameAuthor = () => {
    if (user.id === blog.user.id) {
      return { display: '' }
    } else {
      return { display: 'none'}
    }
  }


  const toggleVisibility = () => {
    setVisible(!visible)
    if (visible) {
      setButtonLabel("view")
    } else {
      setButtonLabel("hide")
    }
  }

  const addLike = async () => {
    const newBlog = {
      user: blog.user._id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      const response = await blogService.update(blog.id, newBlog)
      setLikes(response.likes)
    } catch {
      console.log("addLike did not work")
    }
  }

  const deleteBlog = () => {
    try {
      if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
        blogService.remove(blog.id)
        setDeleted(true)
      }
    } catch {
      console.log("delete failed")
    }
  }

  return (
    <div className="blog" style={hideWhenDeleted}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br />
        Likes: {likes} <button onClick={addLike}>like</button><br />
        {blog.user.name}
        <div style={sameAuthor()}>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
    
  )
}

export default Blog
