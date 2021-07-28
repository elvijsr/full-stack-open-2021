import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
      setFilteredCountries(countries.filter(country => 
      country.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  
  

  return (
    <div>
      <div>
        Find countries
        <input  
          onChange={handleSearchChange}
        />  
      </div>
      {filteredCountries.length > 10 ? 
        <div>too many countries</div> :
        filteredCountries.length === 1 ? 
          filteredCountries.map(country => <Country country={country} />) :
          filteredCountries.map(country => <div key={country.alpha3Code}>{country.name}</div>)
          
      }


    </div>
  )
}

export default App