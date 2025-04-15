import React, { createContext, useState, useContext } from "react";

export const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (item) => {
    if (!favorites.find((fav) => fav._id === item._id)) {
      setFavorites((prev) => [...prev, item]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav._id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
