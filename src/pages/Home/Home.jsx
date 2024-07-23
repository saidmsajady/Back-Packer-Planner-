import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch trips from MongoDB
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/trips`);
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/trips/${id}`);
      setTrips(trips.filter(trip => trip._id !== id));
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  return (
    <div className="home-container">
      {trips.length === 0 ? (
        <div>
          <h2>No Trips Planned</h2>
          <Link to="/create">
            <button>Create Trip</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/create">
            <button>Create Trip</button>
          </Link>
          {trips.map(trip => (
            <div key={trip._id} className="trip-container">
              <h3>{trip.name}</h3>
              <p>Countries: {trip.countries.join(', ')}</p>
              <p>Dates: {trip.dates.join(', ')}</p>
              <button onClick={() => handleDelete(trip._id)}>Delete</button>
              <button>Modify</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;