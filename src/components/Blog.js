import React, { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')

  //the CSS styles of togglable components
  const showWhenVisible = { display: visible ? '' : 'none' }

  //checks if the blog is made by the logged in user
  const sameAuthor = () => {
    if (user.id === blog.user.id) {
      return { display: '' }
    } else {
      return { display: 'none' }
    }}

  //changes button label and toggles visibility
  const toggleVisibility = () => {
    setVisible(!visible)
    if (visible) {
      setButtonLabel('view')
    } else {
      setButtonLabel('hide')
    }
  }




  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} className='toggleButton '>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='extraInfo'>
        {blog.url} <br />
        Likes: <span id='blogLikes'>{blog.likes}</span> <button id='like-button' onClick={() => addLike(blog)}>like</button><br />
        {blog.user.name}
        <div style={sameAuthor()}>
          <button onClick={() => deleteBlog(blog)}>remove</button>
        </div>
      </div>
    </div>

  )
}

export default Blog
