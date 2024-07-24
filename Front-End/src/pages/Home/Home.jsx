import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);
  const [editFormData, setEditFormData] = useState({
    country: '',
    startDate: '',
    endDate: ''
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditSubmit = async (id) => {
    try {
      await axios.put(`http://localhost:3000/trips/${id}`, editFormData);
      // Update the trips state with the new data
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
      // Remove the deleted trip from the UI
      setTrips(trips.filter(trip => trip._id !== id));
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const startEditing = (trip) => {
    setEditingTrip(trip._id);
    setEditFormData({
      country: trip.country,
      startDate: trip.startDate,
      endDate: trip.endDate
    });
  };

  return (
    <div className="home-container">
      {trips.length === 0 ? (
        <div className="no-trips">
          <p>No Trips Planned</p>
          <Link to="/Create">
            <button className="create-trip-button">Create Trip</button>
          </Link>
        </div>
      ) : (
        <div className="trips-list">
          {trips.map(trip => (
            <div key={trip._id} className="trip-card">
              {editingTrip === trip._id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="country"
                    value={editFormData.country}
                    onChange={handleEditChange}
                    placeholder="Country"
                  />
                  <input
                    type="date"
                    name="startDate"
                    value={editFormData.startDate.split('T')[0]} // Format date input
                    onChange={handleEditChange}
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={editFormData.endDate.split('T')[0]} // Format date input
                    onChange={handleEditChange}
                  />
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
                  <h2>{trip.country}</h2>
                  <p>{`From: ${new Date(trip.startDate).toDateString()} To: ${new Date(trip.endDate).toDateString()}`}</p>
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
      )}
    </div>
  );
};

export default Home;