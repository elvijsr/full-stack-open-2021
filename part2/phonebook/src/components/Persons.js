import React from 'react'

const Filter = ({ personsToShow }) => {

  return (
    <ul>
    {personsToShow.map(person =>
      <li key={person.name}>{person.name} {person.tel}</li>)}
    </ul>
  )
}

export default Filter