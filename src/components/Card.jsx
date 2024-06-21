import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Card.css';

const PodcastCard = ({
  id,
  title,
  description,
  genres: genreIds,
  image,
  url,
  seasons,
  updated,
}) => {
  const [genreNames, setGenreNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getGenreNames = async () => {
      try {
        const genreRequests = genreIds.map((id) =>
          axios.get(`https://podcast-api.netlify.app/genre/${id}`)
        );
        const genreResponses = await Promise.all(genreRequests);
        setGenreNames(genreResponses.map((response) => response.data.title));
      } catch (error) {
        console.error('Error retrieving genres:', error);
        setErrorMessage('Unable to load genres');
      }
    };

    getGenreNames();
  }, [genreIds]);

  return (
    <div className="card">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <img src={image} className="card-image" alt={title} />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">
          {description.split(' ').slice(0, 50).join(' ')}...
        </p>
        <div className="card-genres">
          {genreNames.map((genreName, idx) => (
            <span key={idx}>{genreName}</span>
          ))}
        </div>
        <p className="card-seasons">
          <strong>Seasons:</strong> {seasons}
        </p>
        <p className="card-updated">
          <strong>Updated:</strong> {new Date(updated).toLocaleDateString()}
        </p>
      </div>
      <Link to={`/podcast/${id}`} className="card-link">
        View Details
      </Link>
    </div>
  );
};

PodcastCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.number).isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  seasons: PropTypes.number.isRequired,
  updated: PropTypes.string.isRequired,
};

export default PodcastCard;

