import React from "react";

const MediaList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  const MediaHeading = props.heading;

  if (props.contents) {
    return (
      <>
        {props.contents.map((content, index) => (
          <div
            key={content.imdbID}
            className="image-container d-flex justify-content-start m-3"
          >
            <div className="overlay-top d-flex align-items-center justify-content-center">
              <MediaHeading type={props.type} mediaTitle={content.Title} />
            </div>
            <img src={content.Poster} alt="Content" />
            <div
              onClick={() => props.handleFavouritesClick(content.mongoID)}
              className="overlay-bottom d-flex align-items-center justify-content-center"
            >
              <FavouriteComponent />
            </div>
          </div>
        ))}
      </>
    );
  }
};

export default MediaList;
