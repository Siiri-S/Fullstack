import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const setLoggedUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
