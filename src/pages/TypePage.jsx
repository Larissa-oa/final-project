import React, { useContext, useEffect, useState } from 'react';
import { TypeContext } from '../contexts/TypeContext';
import { useParams } from 'react-router-dom';
import { useFavorites } from "../contexts/FavoriteContext";
import { Link } from "react-router-dom";
import backtop from "../assets/back-top.png";
import "./TypePage.css";

const TypePage = () => {
  const { typeTitle } = useParams();
  const { plants } = useContext(TypeContext);
  const { addFavorite } = useFavorites();
  
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [filteredMushrooms, setFilteredMushrooms] = useState([]);
  const [mushrooms, setMushrooms] = useState([]);

  useEffect(() => {
    const getAllMushrooms = async () => {
      try {
        const allMushrooms = await fetch(`${import.meta.env.VITE_API_URL}/mushroom/all-mush`);
        const parsed = await allMushrooms.json();
        setMushrooms(parsed);
      } catch (error) {
        console.error('Error fetching mushrooms:', error);
      }
    };
    getAllMushrooms();
  }, []);

  useEffect(() => {
    if (plants && Array.isArray(plants)) {
      const matchedPlants = plants.filter(
        (plant) => plant.type?.toLowerCase() === typeTitle.toLowerCase()
      );
      setFilteredPlants(matchedPlants);
    }

    if (mushrooms && Array.isArray(mushrooms)) {
      const matchedMushrooms = mushrooms.filter(
        (mushroom) => mushroom.type?.toLowerCase() === typeTitle.toLowerCase()
      );
      setFilteredMushrooms(matchedMushrooms);
    }
  }, [typeTitle, plants, mushrooms]);

  const isMushroomType = typeTitle.toLowerCase() === 'mushrooms';
  
  return (
    <div className="type-wrapper">
      <div className="type-grid">
        {isMushroomType ? (
          filteredMushrooms.length > 0 ? (
            filteredMushrooms.map((mushroom) => (
              <div className="type-info" key={mushroom._id}>
                <h3>{mushroom.name}</h3>
                <Link to={`/type-details/mushroom/${mushroom._id}`}>
                  <div className="image-container">
                    <img src={mushroom.image} alt={mushroom.name} />
                  </div>
                  <h4>{mushroom.scientific_name}</h4>
                </Link>
                <div className="button-container">
                  <Link to={`/type-details/mushroom/${mushroom._id}`}>
                    <button>Details</button>
                  </Link>
                  <button onClick={() => addFavorite(mushroom)}>Favorites</button>

                </div>
              </div>
            ))
          ) : (
            <p>No mushrooms found for type "{typeTitle}".</p>
          )
        ) : filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <div className="type-info" key={plant._id}>
              <h3>{plant.name}</h3>
              <Link to={`/type-details/plants/${plant._id}`}>
                <div className="image-container">
                  <img src={plant.image} alt={plant.name} />
                </div>
                <h4>{plant.scientific_name}</h4>
              </Link>
              <div className="button-container">
                <Link to={`/type-details/plants/${plant._id}`}>
                  <button>Details</button>
                </Link>
                <button onClick={() => addFavorite(plant)}>Favorites</button>

              </div>
            </div>
          ))
        ) : (
          <p>No items found for type "{typeTitle}".</p>
        )}
      </div>

      <button
        className="back-to-top-btn"
        onClick={() => {
          console.log("Back to top clicked");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img src={backtop} alt="Back to top button" />
      </button>
    </div>
  );
};

export default TypePage;
