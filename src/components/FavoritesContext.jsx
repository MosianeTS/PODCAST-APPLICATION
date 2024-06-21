import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (episode) => {
    setFavorites(prevFavorites => [...prevFavorites, episode]);
  };

  const removeFavorite = (episodeId) => {
    setFavorites(prevFavorites => prevFavorites.filter(ep => ep.id !== episodeId));
  };

  const isFavorite = (episodeId) => {
    return favorites.some(ep => ep.id === episodeId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
