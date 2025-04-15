import React, { createContext, useState, useContext, useEffect } from "react";

export const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const addFavorite = (item) => {
    if (!favorites.find((fav) => fav._id === item._id)) {
      const updatedFavorites = [...favorites, item];
      setFavorites(updatedFavorites);
    }
  };

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav._id !== id);
    setFavorites(updatedFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
