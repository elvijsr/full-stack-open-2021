import React from 'react'

const Filter = ({ personsToShow, deletePerson, setPersonsToShow, setPersons }) => {

  const deletion = (id) => {
    window.confirm('Delete this person?') ?
    deletePerson(id)
    .then(
      setPersonsToShow(personsToShow.filter(person => person.id !== id)),
      setPersons(personsToShow.filter(person => person.id !== id))) :
    console.log('Deletion aborted');
  }

  return (
    <ul>
    {personsToShow.map(person =>
      <li key={person.name}>{person.name} {person.number}
      <button onClick={() => deletion(person.id)}>Delete</button>
      </li>)}
    </ul>
  )
}

export default Filter