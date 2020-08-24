import userService from '../services/users'


const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_ALL':
    return action.data
  default:
    return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getUsers()
    dispatch({
      type: 'GET_ALL',
      data: users
    })
  }
}
export default userReducer