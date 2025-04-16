import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';

const TypeContext = createContext();

const TypeContextWrapper = ({ children }) => {
    const nav = useNavigate();
    const [types, setTypes] = useState([]);
    const [plants, setPlants] = useState([]);
   
    
    //*************GET ALL TYPES *****************/

    const getAllTypes = async () => {
        try {
            const allTypes = await fetch(
                `${import.meta.env.VITE_API_URL}/types/all-types`
            );
            const parsed = await allTypes.json();
            setTypes(parsed);
            console.log(allTypes);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTypes();
    }, []);



    //*************GET ALL PLANTS *****************/
    const getAllPlants= async () => {
        try {
            const allPlants = await fetch(
                `${import.meta.env.VITE_API_URL}/plants/all-plants`
            );
            const parsed = await allPlants.json();
            setPlants(parsed);
            console.log(allPlants);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllPlants();
    }, []);


    return (
        <TypeContext.Provider value={{
             getAllTypes, 
             types, 
             setTypes, 
             getAllPlants, 
             plants, 
             setPlants,
            
        }}>
            {children}
        </TypeContext.Provider>
    );
};

export { TypeContext, TypeContextWrapper };
