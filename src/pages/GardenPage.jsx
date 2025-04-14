
import "./LandingPage.css"
import React, { useContext} from 'react'
import "../pages/LandingPage.css"
import "./GardenPage.css"
import { Link } from 'react-router-dom'
import { TypeContext } from '../contexts/TypeContext'


const GardenPage = () => {
const {types} = useContext(TypeContext)


  return (
    <div>
      <div className="section skills-section">
        <div className="section-overlay"></div>
          <h2 className="section-title">Cultivation</h2>

          <div className="skills-grid">
            {types && types.map((oneType) =>{
            return(
              <div className='all-types' key={oneType._id}>
              <Link to={`/garden/${oneType.type}`}>
              <div className="skill-card">
                  <div className="skill-icon-container">
                    <div className="skill-icon" />
                      <img src={oneType.image} alt={oneType.title}/>
                    </div>
                    <h3 className="skill-title">{oneType.type}</h3>
                    {/* <p className="skill-description"></p> */}
                  </div>
                </Link>
                </div>
            )}
          )}
          </div>
        </div>
      </div>  
  )
}

export default GardenPage
