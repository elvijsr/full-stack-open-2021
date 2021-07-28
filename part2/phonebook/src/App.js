import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ personsToShow, setPersonsToShow ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
  }, [])

  const AddedNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="added">
        {message}
      </div>
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
        <AddedNotification message={addedMessage} />
        <Filter persons={persons} setPersonsToShow={setPersonsToShow} />
      <h2>Add new</h2>
        <PersonForm newName={newName} newNumber={newNumber} persons={persons} setPersons={setPersons} 
        setNewName={setNewName} setNewNumber={setNewNumber}
        setPersonsToShow={setPersonsToShow} services={personService} setAddedMessage={setAddedMessage}/>
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} deletePerson={personService.deletePerson} setPersonsToShow={setPersonsToShow}
        setPersons={setPersons}/>
    </div>
  )
}

export default App