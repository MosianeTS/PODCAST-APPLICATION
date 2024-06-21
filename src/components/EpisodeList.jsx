import React, { useState } from "react";
import EpisodeCard from "./EpisodeCard";

const EpisodeList = ({ episodes }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (episodeId) => {
    if (favorites.includes(episodeId)) {
      setFavorites(favorites.filter((id) => id !== episodeId));
    } else {
      setFavorites([...favorites, episodeId]);
    }
  };

  return (
    <div className="episode-list">
      {episodes.map((episode) => (
        <EpisodeCard
          key={episode.id}
          episode={episode}
          isFavorite={favorites.includes(episode.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default EpisodeList;
