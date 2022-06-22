
const ShowButton = ({name, setNewSearch}) => {
   
    return (
        <button onClick={() => setNewSearch(name)}>
            show
        </button>
    )
}


const Country = ({name, setNewSearch}) => {
    return (
        <li>
            {name}
            <ShowButton name={name} setNewSearch={setNewSearch}/>
        </li>
    )
}

const CountryList = ({countries, setNewSearch}) => {

    return ( 
       
        <ul>
            {countries.map(country => 
                <Country 
                    key={country.cca2}
                    name={country.name.common}
                    setNewSearch={setNewSearch}
                />
            )}
        </ul>
        
        
    )
}

export default CountryList