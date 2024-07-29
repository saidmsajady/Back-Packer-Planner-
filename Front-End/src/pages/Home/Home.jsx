import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    countries: [{ country: '', startDate: '', endDate: '' }]
  });

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:3000/trips');
        setTrips(response.data.trips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  const handleEditChange = (index, e) => {
    const { name, value } = e.target;
    const newEditFormData = { ...editFormData };
    newEditFormData.countries[index][name] = value;
    setEditFormData(newEditFormData);
  };

  const handleEditSubmit = async (id) => {
    try {
      await axios.put(`http://localhost:3000/trips/${id}`, editFormData);
      setTrips(trips.map(trip =>
        trip._id === id ? { ...trip, ...editFormData } : trip
      ));
      setEditingTrip(null);
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/trips/${id}`);
      setTrips(trips.filter(trip => trip._id !== id));
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const startEditing = (trip) => {
    setEditingTrip(trip._id);
    setEditFormData({ title: trip.title, countries: trip.countries });
  };

  const addCountry = () => {
    setEditFormData(prevState => ({
      ...prevState,
      countries: [...prevState.countries, { country: '', startDate: '', endDate: '' }]
    }));
  };

  const removeCountry = (index) => {
    setEditFormData(prevState => {
      const newCountries = prevState.countries.filter((_, i) => i !== index);
      return { ...prevState, countries: newCountries };
    });
  };

  return (
    <div className="home-container">
      {trips.length === 0 ? (
        <div className="no-trips">
          <p>No Trips Planned</p>
        </div>
      ) : (
        <>
          <h2> See All Your Trips Below !</h2>
          <div className="trips-list">
            {trips.map(trip => (
              <div key={trip._id} className="trip-card">
                {editingTrip === trip._id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={(e) => setEditFormData(prevState => ({
                        ...prevState,
                        title: e.target.value
                      }))}
                      placeholder="Title"
                    />
                    {editFormData.countries.map((country, index) => (
                      <div key={index} className="edit-entry">
                        <input
                          type="text"
                          name="country"
                          value={country.country}
                          onChange={(e) => handleEditChange(index, e)}
                          placeholder="Country"
                        />
                        <input
                          type="date"
                          name="startDate"
                          value={country.startDate.split('T')[0]}
                          onChange={(e) => handleEditChange(index, e)}
                        />
                        <input
                          type="date"
                          name="endDate"
                          value={country.endDate.split('T')[0]}
                          onChange={(e) => handleEditChange(index, e)}
                        />
                        <button
                          className="remove-button"
                          type="button"
                          onClick={() => removeCountry(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button className="add-country-button" type="button" onClick={addCountry}>Add Country</button>
                    <button
                      className="save-button"
                      onClick={() => handleEditSubmit(trip._id)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setEditingTrip(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="trip-details">
                    <h1>{trip.title}</h1>
                    {trip.countries.map((country, index) => (
                      <div key={index} className="trip-country">
                        <h2>{country.country}</h2>
                        <p>{`From: ${new Date(country.startDate).toDateString()} To: ${new Date(country.endDate).toDateString()}`}</p>
                      </div>
                    ))}
                    <div className="trip-actions">
                      <button
                        className="edit-button"
                        onClick={() => startEditing(trip)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(trip._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <div className="create-trip-container">
        <Link to="/Create">
          <button className="create-trip-button">Create Trip</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;