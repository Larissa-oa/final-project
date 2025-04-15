import React, { useContext} from 'react'
import "./GardenPage.css"
import { Link } from 'react-router-dom'
import { TypeContext } from '../contexts/TypeContext'


const GardenPage = () => {
const {types} = useContext(TypeContext)


  return (
    <div>
<<<<<<< HEAD
          <h2 className="section-title">Garden</h2>
=======
      <div className=" skills-section">
        <div className="section-overlay"></div>
          <h2 className="garden-section-title">Garden</h2>
>>>>>>> c69a2a84a4cbe5098d12fac84d8716274f51a1c3
          <div className="garden-grid">
            {types && types.map((oneType) =>{
            return(
              <div className='category-info' key={oneType._id}>
              <Link to={`/garden/${oneType.type}`}>
                      <img src={oneType.image} alt={oneType.title}/>
                    <h4 className="skill-title">{oneType.type}</h4>
              </Link>
                </div>
            )}
          )}
          </div>
      </div>  
  )
}

export default GardenPage
