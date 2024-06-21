import React from "react";
import PropTypes from "prop-types";
import "./EpisodeCard.css";

const EpisodeCard = ({ episode, isFavorite, onToggleFavorite }) => {
  const { id, title, description } = episode;

  return (
    <div className="episode-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => onToggleFavorite(id)}>
        {isFavorite ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
};

EpisodeCard.propTypes = {
  episode: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default EpisodeCard;
