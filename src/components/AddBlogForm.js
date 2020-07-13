import React from 'react'
const AddBlogForm = ({
  addBlog,
  newTitle,
  setNewTitle,
  newAuthor,
  setNewAuthor,
  newUrl,
  setNewUrl
}) => {

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
              title:
          <input type='text' value={newTitle} name='Title' onChange={({ target }) => setNewTitle(target.value)}/>
        </div>
        <div>
              author:
          <input type='text' value={newAuthor} name='Author' onChange={({ target }) => setNewAuthor(target.value)}/>
        </div>
        <div>
              url:
          <input type='text' value={newUrl} name='Url' onChange={({ target }) => setNewUrl(target.value)}/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AddBlogForm