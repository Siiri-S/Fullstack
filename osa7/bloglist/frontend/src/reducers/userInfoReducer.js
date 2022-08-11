import { createSlice } from '@reduxjs/toolkit'

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    username: '',
    password: '',
  },
  reducers: {
    setUsername(state, action) {
      return { ...state, username: action.payload }
    },
    setPassword(state, action) {
      return { ...state, password: action.payload }
    },
    clearUserInfo() {
      return {
        username: '',
        password: '',
      }
    },
  },
})

export const { setUsername, setPassword, clearUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer
