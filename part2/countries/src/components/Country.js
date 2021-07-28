import React from 'react'

const Country = ({ country }) => {
  return (
    <div>
        <h1>{country.name}</h1>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <h2>Languages</h2>
        <ul>
            {country.languages.map(language =>
                <li key={language.iso639_2}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt='flag' width='300'/>
    </div>
  )
}

export default Country