import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (object, id) => {
  return async (dispatch) => {
    const newBlog = await blogService.update(id, {
      ...object,
      likes: object.likes + 1,
    })
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.map((blog) => (blog.id !== id ? blog : newBlog))))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
  }
}

export default blogSlice.reducer
