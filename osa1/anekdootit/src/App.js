import { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Anecdote = ({text, votes}) => {
return (
  <>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </>
)
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
  

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const drawAnecdote = () => {
    const i = Math.floor(Math.random() * anecdotes.length)
    setSelected(i)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotes = () => {
    let i = 0
    let voteAmount = 0
    let item = 0
    votes.forEach( e => {
      if (e > voteAmount) {
        item = i
        voteAmount = e
      } 
      i += 1
    }
    )
    return item
  }

  
  return (
    <div>
      <Header text='Anecdote of the day'/>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClick={vote} text='vote'/>
      <Button handleClick={drawAnecdote} text='next anecdote'/>
      <Header text='Anecdote with most votes'/>
      <Anecdote text={anecdotes[mostVotes()]} votes={votes[mostVotes()]}/>
    </div>
  )
}

export default App