import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Adjust dates to avoid timezone issues
    const newTrip = {
      country,
      startDate: new Date(startDate + 'T00:00:00').toISOString(), // Add time part to avoid timezone issues
      endDate: new Date(endDate + 'T00:00:00').toISOString(), // Add time part to avoid timezone issues
    };

    try {
      await axios.post('http://localhost:3000/trips', newTrip);
      console.log('Trip created:', newTrip);
      navigate('/');
    } catch (error) {
      console.error('There was an error creating the trip!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">
        Create Trip
      </button>
    </form>
  );
};

export default Create;