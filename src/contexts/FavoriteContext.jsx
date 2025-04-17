import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/user-favorites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Keep the actual item + the favorite DB id
      const fullItems = res.data.map((fav) => ({
        ...fav.item,
        type: fav.item?.type, 
        favoriteId: fav._id,   
      }));
  
      setFavorites(fullItems);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };


  const addFavorite = async (item) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found!");
        return;
      }
  
      const itemType = item.type?.toLowerCase() === "mushroom" ? "Mushroom" : "Plant";
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/adding`,
        {
          item: item._id,
          itemType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // 👈 explicit, safe for deployed APIs
          },
          withCredentials: true, // 👈 just in case backend needs cookies too (optional)
        }
      );
  
      // Add full response (with type + favoriteId) to state, not just item
      const favoriteItem = {
        ...item,
        type: itemType,
        favoriteId: response.data._id, // 👈 allows proper "remove" function later
      };
  
      setFavorites((prev) => [...prev, favoriteItem]);
      console.log("Added to favorites:", favoriteItem);
    } catch (err) {
      console.error("Error adding favorite:", err?.response?.data || err.message);
    }
  };  

 const removeFavorite = async (favoriteId) => {
  try {
    const token = localStorage.getItem("authToken");

    await axios.delete(`${import.meta.env.VITE_API_URL}/auth/remove/${favoriteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Remove from local state
    setFavorites((prev) => prev.filter((fav) => fav.favoriteId !== favoriteId));

    console.log("Removed from favorites:", favoriteId);
  } catch (err) {
    console.error("Error removing favorite:", err);
  }
};



  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite,fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

