import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', tel: '040-123456' },
    { name: 'Ada Lovelace', tel: '39-44-5323523' },
    { name: 'Dan Abramov', tel: '12-43-234345' },
    { name: 'Mary Poppendieck', tel: '39-23-6423122' }
  ])
  const [ personsToShow, setPersonsToShow ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  return (
    <div>
      <h2>Phonebook</h2>
        <Filter persons={persons} setPersonsToShow={setPersonsToShow} />
      <h2>Add new</h2>
        <PersonForm newName={newName} newNumber={newNumber} persons={persons} setPersons={setPersons} 
        setNewName={setNewName} setNewNumber={setNewNumber} setPersonsToShow={setPersonsToShow}/>
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App