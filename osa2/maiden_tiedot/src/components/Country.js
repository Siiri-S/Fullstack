const Language = ({language}) => <li>{language}</li>

const Languages = ({languages}) => {
    return (
        <ul>
            {Object.values(languages).map((language, index) =>
                <Language key={'language-' + index} language={language}/>
            )}
        </ul>
    )
}

const Flag = ({country}) => {
    return (
        <img
            src={country.flags.png}
            style={{width: "120px"}}
            alt={country.name.common + " flag"}
        />
    )
}



const Weather = ({ weather, capital }) => (
    <div>
      <h3> Weather in {capital} </h3>
      <>
        <strong>temperature: </strong> {weather.temp_c} Celcius
      </>
      <div>
        <img 
            src={weather.condition.icon}
            style={{width: "120px"}}
            alt={capital + "weather"}
        /> 
      </div>
      
      <>
        <strong>wind: </strong> {weather.wind_kph} km/h direction{" "}
        {weather.wind_dir}
      </>
      <div>
        Powered by{" "}
        <a href="https://www.weatherapi.com/" title="Weather API">
          WeatherAPI.com
        </a>
      </div>
    </div>
  );

const Info = ({country}) => {
    return (
        <>
            <p> capital {country.capital}</p>
            <p>area {country.area}</p>
            <b>languages:</b>
            <Languages languages={country.languages} />
            
        </>
        
    )
    
}


const Country = ({country, weather}) => {
    console.log(weather.condition.icon)
    
    return (
        <>
            <h2>{country.name.common}</h2>
            <Info country={country}/>
            <Flag country={country}/>
            <Weather weather={weather} capital={country.capital}/>

        </>
    )
}


export default Country