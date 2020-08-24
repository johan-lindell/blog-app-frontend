const notificationReducer = (state = { type: null }, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    return {
      message: action.data,
      type: 'notification',
    }
  case 'SHOW_ERROR':
    return {
      message: action.data,
      type: 'error',
    }
  case 'HIDE_NOTIFICATION':
    return { message: '', type: null }
  default:
    return state
  }
}

//t is defined to setTimeout so the clearTimeout clears the correct timeout
let t
export const setNotification = (data, type, time) => {
  console.log(type)
  return async dispatch => {
    dispatch({
      type: `SHOW_${type.toUpperCase()}`,
      data: data
    })
    clearTimeout(t)
    t = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, time)
  }
}
export default notificationReducer