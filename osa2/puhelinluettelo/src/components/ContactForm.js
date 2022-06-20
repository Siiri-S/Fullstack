
const InputField = ( {text, value, handleChange}) => {
    return(
        <div>
            {text}
                <input 
                    value={value}
                    onChange={handleChange}
                />
        </div>
    )
   
}


const ContactForm = (props) => {
    const {addPerson, newName, handleNameChange, newNumber, handleNumberChange} = props
    return (
        <form onSubmit={addPerson}>
        <InputField text='name:' value={newName} handleChange={handleNameChange}/>
        <InputField text='number:' value={newNumber} handleChange={handleNumberChange}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default ContactForm