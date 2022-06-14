
const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Part = (props) => (
  <p>
      {props.part} {props.exercises}
  </p>
)

const Content = (props) => (
  <>
   <Part part={props.contents[0][0]} exercises={props.contents[0][1]}/>
   <Part part={props.contents[1][0]} exercises={props.contents[1][1]}/>
   <Part part={props.contents[2][0]} exercises={props.contents[2][1]}/>
  </>
)

const Total = (props) => (
  <>
  <p>Number of exercises {props.exercises}</p>
  </>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content contents={[[part1, exercises1], [part2, exercises2], [part3, exercises3]]} />
      <Total exercises={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App