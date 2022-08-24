import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select';
import { EDIT_AUTHOR, ALL_AUTHORS} from '../queries'

const AuthorEditForm = ({authors}) => {

    const [year, setYear] = useState('')
    const [selectedOption, setSelectedOption] = useState(null);
    const [ changeYear ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [  {query: ALL_AUTHORS} ],
    })

    const submit = async (event) => {
        event.preventDefault()
        changeYear({variables: {name: selectedOption.value, setBornTo: parseInt(year)}})
        setYear('')
    }

   
    const options = authors.map( ({name}) => {
        const str = `{"value": "${name}", "label": "${name}"}`
        return JSON.parse(str)
    })


    
    return (
        <div>
            <h2>set the year of birth for author</h2>
            <form onSubmit={submit}>
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />
                born <input
                value={year}
                onChange={({ target }) => setYear(target.value)}
            />
                <button type='submit'>update</button>
            </form>
            
        </div>
    )
}

export default AuthorEditForm