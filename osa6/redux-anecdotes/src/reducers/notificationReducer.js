import { createSlice } from '@reduxjs/toolkit'



const notificationSlice = createSlice({
  name: 'notification',
  initialState: "",
  reducers: {
    createNotification(state, action) {
      const text = action.payload
      return text
    },
    clearNotification(state, action) {
      return ""
    }

  }
})


export const { createNotification, clearNotification } = notificationSlice.actions

let timeoutId 

export const setNotification = (message, time) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch(createNotification(message))
    timeoutId = setTimeout(() => dispatch(clearNotification()), time*1000)
    
  }
}

export default notificationSlice.reducer