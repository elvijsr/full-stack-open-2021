import React from 'react'

const PersonForm = ({ newName, newNumber, persons, setPersons,
    setNewName, setNewNumber, setPersonsToShow }) => {

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            tel: newNumber
        }
        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        }
        else {
            const newList = persons.concat(personObject)
            setPersons(newList)
            setPersonsToShow(newList)
            setNewName('')
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    
    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

  return (
    <form onSubmit={addPerson}>
    <div>
      name: <input 
    value={newName} 
    onChange={handleNameChange}
     />
    </div>
    <div>
      number: <input 
    value={newNumber} 
    onChange={handleNumberChange}
     />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm