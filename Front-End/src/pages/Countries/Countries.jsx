import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Countries.css';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,languages,currencies');
        const sortedCountries = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sortedCountries);

        const uniqueRegions = [...new Set(response.data.map(country => country.region).filter(Boolean))];
        setRegions(uniqueRegions);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const filteredCountries = countries.filter(country => {
    return (
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRegion ? country.region === selectedRegion : true)
    );
  });

  return (
    <>
    <br/><br/>
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search by country name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select value={selectedRegion} onChange={handleRegionChange} className="region-select">
          <option value="">All Regions</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
      <div className="countries-container">
        {filteredCountries.map(country => (
          <div key={country.name.common} className="country-card">
            <img src={country.flags.svg} alt={`${country.name.common} flag`} className="country-flag" />
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
            <p>Region: {country.region || 'N/A'}</p>
            <p>
              Languages: {country.languages 
                ? Object.values(country.languages).join(', ') 
                : 'N/A'}
            </p>
            <p>
              Currencies: {country.currencies 
                ? Object.values(country.currencies)
                    .map(currency => currency.name)
                    .join(', ') 
                : 'N/A'}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Countries;