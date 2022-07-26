import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const oldAnecdote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...oldAnecdote,
        votes: oldAnecdote.votes + 1
      }
     
      return state.map(anecdote => 
        anecdote.id !== id
          ? anecdote
          : changedAnecdote
          )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (newObject, id) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.update(id, newObject)
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.map(anecdote => 
      anecdote.id !== id
        ? anecdote
        : newAnecdote
    )))
  }
}

export default anecdoteSlice.reducer