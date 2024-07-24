import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTrip = { country, startDate, endDate };

    axios.post('http://localhost:3000/trips', newTrip)
      .then(response => {
        console.log('Trip created:', response.data);
      })
      .catch(error => {
        console.error('There was an error creating the trip!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>City/Country:</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </div>
      <button type="submit">Create Trip</button>
    </form>
  );
};

export default Create;