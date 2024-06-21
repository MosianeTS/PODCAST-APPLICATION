import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';
import './FavoriteEpisodes.css';

const FavoriteEpisodes = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorite-episodes-container">
      <h2 className="favorites-heading">Favorite Episodes</h2>
      <div className="favorite-episodes-list">
        {favorites.length > 0 ? (
          favorites.map(episode => (
            <div key={episode.id} className="favorite-episode">
              <h3>{episode.title}</h3>
              <p><strong>Show:</strong> {episode.showTitle}</p>
              <p><strong>Season:</strong> {episode.seasonTitle}</p>
              <audio controls>
                <source src={episode.title} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))
        ) : (
          <p>No favorite episodes yet.</p>
        )}
      </div>
      <Link to="/" className="back-to-home">Back to Home</Link>
    </div>
  );
};

export default FavoriteEpisodes;
