import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Person from './components/Person'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

 
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(contactObject.name)) {
      const message = `${contactObject.name} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(message)) {
        const person = persons.find(p => p.name === contactObject.name)
        const changedContact = {...person, number: contactObject.number}
        personService
          .update(person.id, changedContact)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.name !== contactObject.name ? person : returnedPerson))
          })
      }
    }
    else {
      personService
        .create(contactObject)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setNewName('')
          setNewNumber('')
        })
    }   
  }

  const removePerson = (person) => {
    const id = person.id
    const message = `Delete ${person.name} ?`
    if (window.confirm(message)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert(`${person.name} was already deleted from server`)
        setPersons(persons.filter(person => person.id !== id))
      })
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
      <ul>
        {personsToShow.map(person => 
          <Person 
            key={person.id}
            person={person}
            removePerson = {() => removePerson(person)}
          />
        )}
      </ul>
    </div>
  )

}

export default App