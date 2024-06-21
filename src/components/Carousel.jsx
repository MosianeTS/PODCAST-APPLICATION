import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const getRandomSubset = (arr, count) => {
  const shuffled = arr.sort(() => 0.6 - Math.random());
  return shuffled.slice(0, count);
};

const CarouselComponent = function () {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);   //display is loading while data is being fetched

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((response) => response.json())
      .then((data) => {
        const randomPodcasts = getRandomSubset(data, 8);   //Obtain 8 random podcasts to display on the carousel
        setPodcasts(randomPodcasts);
        setIsLoading(false);                //remove is loading after data is loaded
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); 
      });
  }, []);

  const onChange = (index) => {
    console.log(`Slide changed to: ${index}`);
  };

  const onClickItem = (index, item) => {
    console.log(`Item ${index} clicked:`, item);
  };

  const onClickThumb = (index, item) => {
    console.log(`Thumbnail ${index} clicked:`, item);
  };

  return (
    <div className="custom-carousel">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            color: "blue",
            fontSize: "40px"
          }}
        >
          <span>Loading...</span>
        </div>
      ) : (
        <Carousel
          showArrows={true}
          onChange={onChange}
          onClickItem={onClickItem}
          onClickThumb={onClickThumb}
        >
          {podcasts.map((podcast, index) => (
            <div key={podcast.id}>
              <img src={podcast.image} alt={`Slide ${index + 1}`} />              
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselComponent;
