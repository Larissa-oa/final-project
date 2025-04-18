import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';   
import { ForumContext } from '../contexts/ForumContext';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import "./PopupCreateForumForm.css";

const PopUpCreateForumForm = ({ closeModal }) => {
  const [forumTitle, setForumTitle] = useState("");
  const [forumDescription, setForumDescription] = useState("");
  const [forumLocation, setForumLocation] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 51.505, lng: -0.09 });
  const { handleCreateTopic } = useContext(ForumContext);
  const { currentUser } = useContext(AuthContext);

  
  useEffect(() => {
    if (forumLocation.length > 3) {
      const timeout = setTimeout(() => {
        handleSearch(forumLocation);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [forumLocation]);

  const handleSearch = async (query) => {
    try {
      const res = await fetch(`/auth/location/search?q=${query}`);
      
    
      const contentType = res.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();

        if (data && data.lat && data.lon) {
          setCoordinates({
            lat: parseFloat(data.lat),
            lng: parseFloat(data.lon),
          });
        } else {
          console.error("Location not found");
        }
      } else {
        const text = await res.text();
        console.error("Received HTML instead of JSON:", text);
      }
    } catch (error) {
      console.error("Location search failed:", error);
    }
  };

  return (
    <div className="forum-body">
      <button className="btn-close" onClick={closeModal}>×</button>
      <h2 className="title-form-create-forum">Sprout a New Forum</h2>
      <form
        className="form-create-t"
        onSubmit={(e) => {
          e.preventDefault();
          const image = e.target.image.files[0];

          handleCreateTopic(e, {
            title: forumTitle,
            description: forumDescription,
            location: forumLocation,
            image,
            author: currentUser ? currentUser._id : null,
            profileImage: currentUser ? currentUser.profileImage : null,
            createdAt: currentUser ? currentUser.timestamp : null,
            coordinates,
          });

          closeModal();
        }}
      >
        <label className="label-form">
          Title:
          <input
            type="text"
            value={forumTitle}
            onChange={(e) => setForumTitle(e.target.value)}
            className="input-form"
            required
          />
        </label>

        <label className="label-form">
          Description:
          <input
            type="text"
            value={forumDescription}
            onChange={(e) => setForumDescription(e.target.value)}
            className="input-form"
            required
          />
        </label>

        <label className="label-form">
          Location:
          <input
            type="text"
            value={forumLocation}
            onChange={(e) => setForumLocation(e.target.value)}
            className="input-form"
            placeholder="Search for a place..."
            required
          />
        </label>

        <div className="map-wrapper">
          {/* MapContainer directly uses coordinates for the center */}
          <MapContainer 
            key={`${coordinates.lat}-${coordinates.lng}`} // Force re-render by changing the key
            center={[coordinates.lat, coordinates.lng]} 
            zoom={13} 
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Marker placed on the fetched coordinates */}
            <Marker position={[coordinates.lat, coordinates.lng]} />
          </MapContainer>
        </div>

        <label className="label-form">
          Image:
          <input
            type="file"
            name="image"
            className="input-form"
          />
        </label>

        <div className="align-btn">
          <button type="submit" className="submite-create-forum-btn">
            Let's get it started
          </button>
        </div>
      </form>
    </div>
  );
};

export { PopUpCreateForumForm };
