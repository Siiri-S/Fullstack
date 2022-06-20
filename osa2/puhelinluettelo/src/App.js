import { useState } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  

  const addPerson = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(contactObject.name)) window.alert(`${newName} is already added to phonebook`)
    else {
      setPersons(persons.concat(contactObject))
      setNewName('')
      setNewNumber('')
    }   
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = 
    filter !== ""
      ? persons.filter( person =>
        person.name.toLowerCase().includes(filter))
      : persons   

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <ContactForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons = {personsToShow}/>
    </div>
  )

}

export default App