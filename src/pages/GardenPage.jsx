import React, { useContext} from 'react'
import "./GardenPage.css"
import { Link } from 'react-router-dom'
import { TypeContext } from '../contexts/TypeContext'


const GardenPage = () => {
const {types} = useContext(TypeContext)


  return (
    <div  className="garden-page-total">
          <h2 className="section-title">Garden</h2>
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
