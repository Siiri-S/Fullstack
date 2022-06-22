import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
 
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const showStatusMessage = (message) => {
    setStatusMessage(message)
    setTimeout(() => {
      setStatusMessage(null)
    }, 2000)
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }

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
            showStatusMessage(`Changed the number of ${contactObject.name}`)
            setPersons(persons.map(p => p.name !== contactObject.name ? person : returnedPerson))
          })
          .catch(error => {
            showErrorMessage(`${person.name} was already deleted from server`)
            setNewName('')
            setNewNumber('')
            setPersons(persons.filter(person => person.name !== contactObject.name))
          })
      }
    }
    else {
      personService
        .create(contactObject)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          showStatusMessage(`Added ${contactObject.name}`)
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
        showStatusMessage(`Removed ${person.name}`)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        showErrorMessage(`${person.name} was already deleted from server`)
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
      <Notification message={errorMessage} type='error' />
      <Notification message={statusMessage} type='status' />
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