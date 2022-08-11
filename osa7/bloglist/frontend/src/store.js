import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import userInfoReducer from './reducers/userInfoReducer'
import userListReducer from './reducers/userListReducer'
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    userInfo: userInfoReducer,
    userList: userListReducer,
  },
})

export default store
