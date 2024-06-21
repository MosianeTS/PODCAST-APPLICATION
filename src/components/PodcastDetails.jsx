// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './PodcastDetails.css';

// const PodcastDetails = () => {
//   const { id } = useParams();
//   const [podcast, setPodcast] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPodcastDetails = async () => {
//       try {
//         const response = await axios.get(`https://podcast-api.netlify.app/id/${id}`);
//         console.log('Podcast details fetched:', response.data);
//         setPodcast(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchPodcastDetails();
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>{podcast.title}</h2>
//       <img src={podcast.image} alt={podcast.title} />
//       <p>{podcast.description}</p>
//       <h3>Seasons</h3>
//       {podcast.seasons.length === 0 ? (
//         <p>No seasons available for this podcast.</p>
//       ) : (
//         <ul>
//           {podcast.seasons.map(season => (
//             <li key={season.id}>{season.title}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default PodcastDetails;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './PodcastDetails.css';

const PodcastDetails = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        const response = await axios.get(`https://podcast-api.netlify.app/id/${id}`);
        setPodcast(response.data);
        if (response.data.seasons.length > 0) {
          setSelectedSeason(response.data.seasons[0].id); // Default to the first season
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPodcastDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!podcast) return <div>No podcast details available.</div>;

  const handleSeasonChange = (event) => {
    setSelectedSeason(parseInt(event.target.value));
  };

  const selectedSeasonData = podcast.seasons.find(season => season.id === selectedSeason);

  return (
    <div className="podcast-details-container">
      <h2 className="podcast-title">{podcast.title}</h2>
      <img src={podcast.image} alt={podcast.title} className="podcast-image" />
      <p className="podcast-description">{podcast.description}</p>
      <h3 className="seasons-heading">Seasons</h3>
      <select className="season-select" value={selectedSeason} onChange={handleSeasonChange}>
        {podcast.seasons.map(season => (
          <option key={season.id} value={season.id}>{season.title}</option>
        ))}
      </select>
      <div className="season-info">
        {selectedSeasonData && (
          <p>Total Episodes: {selectedSeasonData.episodes.length}</p>
        )}
        {/* <Link to={`/show/${id}`} className="back-to-show">Back to Show</Link> */}
      </div>
      <div className="episodes-container">
        <h4>Episodes</h4>
        {selectedSeasonData && selectedSeasonData.episodes.length > 0 ? (
          selectedSeasonData.episodes.map(episode => (
            <div key={episode.id} className="episode">
              <h5>{episode.title}</h5>
              <audio controls>
                <source src={episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))
        ) : (
          <p>No episodes available for this season.</p>
        )}
      </div>
    </div>
  );
};

export default PodcastDetails;
