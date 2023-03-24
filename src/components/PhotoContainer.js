import React from "react";
import PhotoItem from "./PhotoItem";




const PhotoContainer = ( {photos} ) => {
    console.log(photos);
    const photosList = photos.map( item => <PhotoItem  data={item} key={item.id}/> );


    
    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {photosList}
            </ul>
        </div>
    )
}

export default PhotoContainer;