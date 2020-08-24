import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data
  case 'DELETE_BLOG': {
    const id = action.data.id
    const updatedBlogs = state.filter(b => b.id !== id)
    return updatedBlogs
  }
  case 'LIKE_BLOG': {
    const id = action.data.id
    return state.map(b =>
      b.id !== id ? b : action.data)
  }
  case 'COMMENT_BLOG': {
    const id = action.data.id
    return state.map(b =>
      b.id !== id ? b : action.data)
  }
  default:
    return state
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: sortedBlogs,
    })
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      //removed blog from database
      await blogService.remove(blog.id)
      dispatch({
        type: 'DELETE_BLOG',
        data: blog,
      })
    }
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    await blogService.update(blog.id, updatedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog,
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(comment),
    }
    await blogService.update(blog.id, updatedBlog)
    dispatch({
      type: 'COMMENT_BLOG',
      data: updatedBlog,
    })
  }
}
export default blogReducer