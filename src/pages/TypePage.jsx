import React, { useContext, useEffect, useState } from 'react';
import { TypeContext } from '../contexts/TypeContext';
import { useParams } from 'react-router-dom';
import backtop from "../assets/back-top.png";
import "./TypePage.css"


const TypePage = () => {
  const { typeTitle } = useParams();
  const { plants } = useContext(TypeContext);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [filteredMushrooms, setFilteredMushrooms] = useState([]);
  const [mushrooms, setMushrooms] = useState([]);

  useEffect(() => {
    const getAllMushrooms = async () => {
      try {
        const allMushrooms = await fetch(
          `${import.meta.env.VITE_API_URL}/mushroom/all-mush`
        );
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
    <div>
      {isMushroomType ? (
        filteredMushrooms.length > 0 ? (
          filteredMushrooms.map((mushroom) => (
            <div className="section skills-section" key={mushroom._id}>
                <h2 className="section-title">{mushroom.name}</h2>
                <div className="skills-grid">
                    <div className="skill-card">
                      <div className="skill-icon-container">
                        <div className="skill-icon" />
                           <img src={mushroom.image} alt={mushroom.name} />
                        </div>
                          <h3 className="skill-title"> 
                            <p>{mushroom.scientific_name}</p>
                          </h3> 
                        </div>
              </div>
            </div>
      ))
        
        ) : (
          <p>No mushrooms found for type "{typeTitle}".</p>
        )
      ) : filteredPlants.length > 0 ? (
        filteredPlants.map((plant) => (
          <div className="section skills-section" key={plant._id}>
          <div className="section-overlay"></div>
            <h2 className="section-title">{plant.name}</h2>
            <div className="skills-grid">
             <div className='all-types' >
                <div className="skill-card">
                  <div className="skill-icon-container">
                    <div className="skill-icon" />
                       <img src={plant.image} alt={plant.name} />
                    </div>
                      <h3 className="skill-title">
                        {plant.scientific_name}
                      </h3> 
                    </div>
                  </div>
              </div>
            </div>
        ))
      ) : (
        <p>No items found for type "{typeTitle}".</p>
      )}
      {/* Back to Top Button */}
            <button
              className="back-to-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img src={backtop} alt="Back to top button" />
            </button>
    </div>
  );
};

export default TypePage;
