import { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}> {text} </button>
)

const StatisticLine = ({text, value, postfix}) => {
  return(
  <tr>
    <td>{text}</td>
    <td>{value} {postfix}</td>
  </tr>
  )
}
  
  


const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positives = (good / all) * 100
  if (all === 0) return (
    <p>No feedback given</p>
  )
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={all}/>
          <StatisticLine text='average' value={average}/>
          <StatisticLine text='positive' value={positives} postfix='%'/>
        </tbody>
      </table>
    </>
    
  )
}
    

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodReview = () => setGood(good + 1)
  const handleNeutralReview = () => setNeutral(neutral + 1)
  const handleBadReview = () => setBad(bad + 1)

  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={handleGoodReview} text='good'/>
      <Button handleClick={handleNeutralReview} text='neutral'/>
      <Button handleClick={handleBadReview} text='bad'/>
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App