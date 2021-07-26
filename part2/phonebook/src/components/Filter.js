import React from 'react'

const Filter = ({ persons, setPersonsToShow }) => {

  const handleFilterChange = (event) => {
    if (event.target.value === '') {
        setPersonsToShow(persons)
    }
    else {
        setPersonsToShow(persons.filter(person => 
        person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }
    }

  return (
    <div>
    Filter shown with
    <input onChange={handleFilterChange} />
    </div>
  )
}

export default Filter