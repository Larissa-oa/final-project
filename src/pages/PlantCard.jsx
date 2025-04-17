import React, { useEffect, useState } from 'react';
import "./PlantCard.css";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PlantCard = () => {
  const [foundPlant, setFoundPlant] = useState(null);
  const { itemId, plantsType } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/${plantsType}/type/${itemId}`);
        setFoundPlant(res.data);
        console.log("Found one:", res.data);
      } catch (err) {
        console.error("Error fetching item:", err);
      }
    };
    fetchItem();
  }, [itemId, plantsType]);

  if (!foundPlant) return <p>Loading...</p>;

  // Normalize the plant type for consistent comparison
  const plantType = foundPlant?.type?.toLowerCase();
  const isMushroom = plantType === "mushrooms";
  const isOtherPlant = ["trees", "indoor plants", "fruits & vegetables"].includes(plantType);
  

  return (
    <div className="plant-card-wrapper">
      {isMushroom ? (
        <div className="plants-card">
           <h2>{foundPlant.name}</h2>
              <div className="plant-image-container">
                 <img src={foundPlant.image} alt={foundPlant.name} className="plant-image" />
              </div>
              <div className="plant-info">
              <p><strong>Scientific Name: </strong>{foundPlant.scientific_name}</p>
                <p><strong>Basic Care:</strong> {foundPlant.basic_care}</p>
                <p><strong>Ideal Environment:</strong> {foundPlant.ideal_environment}</p>
                <p><strong>Edible:</strong> {foundPlant.edible}</p>
              </div>

      </div>
      
      ) : isOtherPlant ? (
        <div className="plants-card">
              <h2>{foundPlant.name}</h2>
              <div className="plant-card-content">
                  <div className="plant-image-container">
                    <img src={foundPlant.image} alt={foundPlant.name} className="plant-image" />
                  </div>
                  <div className="plant-info">
                    <h3>Scientific Name:{foundPlant.scientific_name}</h3>
                    <p><strong>Basic Care:</strong> {foundPlant.basic_care}</p>
                    <p><strong>Watering Instructions:</strong> {foundPlant.watering_instructions}</p>
                  </div>
              </div>
          </div>
      ) : (
        <p>Sorry, we don't have details for plant type "{plantsType}".</p>
      )}
    </div>
  );
};

export default PlantCard;
