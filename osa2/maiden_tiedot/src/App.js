import axios from 'axios'
import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import CountryList from './components/CountryList'
import Country from './components/Country'


const App = () => {
    const [search, setNewSearch] = useState("")
    const [countries, setNewCountries] = useState([])
    const [weatherData, setWeatherData] = useState([])

    const countryQuery = () => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => setNewCountries(response.data))
    }

    useEffect(countryQuery, [])

    const weatherApiKey = process.env.REACT_APP_API_KEY

  
    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }

    const countryList = 
        search !== ""
            ? countries.filter(country => 
                country.name.common.toLowerCase().includes(search.toLowerCase()))
            : countries
    
    useEffect( () => {
        if (countryList.length === 1) {
            const capitalCity = countryList[0].capital[0].toLowerCase()
            console.log(capitalCity)
            axios
            .get(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${capitalCity}`)
            .then((response) => {
                setWeatherData(response.data.current)
                
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

        
    return (
        <div>
            <SearchBar search={search} handleSearchChange={handleSearchChange}/>
            {
                countryList.length > 10 && (
                    <p>Too many matches, specify another filter</p>
                )
            }
            {
                countryList.length <= 10 && countryList.length > 1 && (
                    <CountryList countries={countryList} setNewSearch={setNewSearch}/>
                )
            }
            {
                countryList.length === 1
                && (<Country country={countryList[0]} weather={weatherData}/>)
            }
        </div>
    )

}



export default App