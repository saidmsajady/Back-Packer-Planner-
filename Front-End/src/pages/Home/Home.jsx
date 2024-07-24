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
      // Adjust dates for server processing
      const updatedTrip = {
        ...editFormData,
        startDate: new Date(editFormData.startDate + 'T00:00:00').toISOString(),
        endDate: new Date(editFormData.endDate + 'T00:00:00').toISOString()
      };
      await axios.put(`http://localhost:3000/trips/${id}`, updatedTrip);
      setTrips(trips.map(trip =>
        trip._id === id ? { ...trip, ...updatedTrip } : trip
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
    setEditFormData({
      country: trip.country,
      startDate: trip.startDate.split('T')[0], // Display date only
      endDate: trip.endDate.split('T')[0] // Display date only
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
                    value={editFormData.startDate} // Format date input
                    onChange={handleEditChange}
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={editFormData.endDate} // Format date input
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
                  <p>{`From: ${new Date(trip.startDate).toLocaleDateString()} To: ${new Date(trip.endDate).toLocaleDateString()}`}</p>
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