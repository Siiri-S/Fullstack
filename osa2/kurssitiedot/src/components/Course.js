const Total = ( {parts}) => {
    const total = parts.reduce(
      (p, c) => p + c.exercises,
      0)
    return (
      <b>total of {total} exercises</b>
    )
  }
  
  const Header = ({courseName}) => (
    <>
      <h1>{courseName}</h1>
    </>
  )
  
  const Part = ({name, exercises}) => (
    <p>
        {name} {exercises}
    </p>
  )
  
  const Content = ({parts}) => (
    <>
      {parts.map(part =>
        <Part key={Math.ceil(Math.random()*1000000000)} name={part.name} exercises={part.exercises}/>
      )}
    </>
  )
  
  const Course = ({course}) => {
  
    return (
      <>
        <Header courseName={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    ) 
  }

export default Course