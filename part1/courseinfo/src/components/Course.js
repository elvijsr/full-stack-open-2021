import React from 'react'


const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.parts.name} {props.parts.exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({course}) => {
    return (
      <div>
        {course.parts.map(part =>
          <Part key={part.id} parts={part}/>
          )}
      </div>
    )
  }
  
  const Total = ({course}) => {
    const total = course.parts.reduce((s, p) => {
      return s + p.exercises
    }, 0)
    return (
      <div>
        <b><p>Total exercises: {total}</p></b>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  export default Course