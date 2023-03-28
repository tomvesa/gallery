import React from "react";
import PhotoItem from "./PhotoItem";
import { useState, useEffect } from "react";

import apiKey  from './config';
import configQueryParams from './configQueryParams';




const PhotoContainer = ( {search} ) => {
    
//console.log(search);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    //const { apiKey } = config; 
    const { baseUrl,
            perPage, 
            outputFormat
                          } = configQueryParams;
    console.log(apiKey);
// fetch photos based on the query params and search from the user interaction                          
    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}&api_key=${apiKey}&tags=${search}&per_page=${perPage}&page=&format=${outputFormat}&nojsoncallback=1`)
        .then(response => response.json())
        .then(json =>     {
                            setPhotos( json.photos.photo);
                            setLoading(false);
                        })
        .catch(error => console.log("error Fetching data ", error));

    },[search, baseUrl, perPage, outputFormat]);  //fetch only when searchValue has changed

// render the photo list from feched photos if those are found   
if(!photos.length){
    return (
        <div className="photo-container">
            { (loading) ?
                            <p>Loading....</p> 
                        :   <div>
                                <h2>No Results found </h2>
                                <h4>{search}</h4>
                            </div>
            }
        </div>
        ) 
    } else{
        const photosList = photos.map( item => <PhotoItem  data={item} key={item.id}/> );
     return (
        <div className="photo-container">
                    { (loading) ?
                            <p>Loading....</p> 
                        :   <div>
                                <h2>Results</h2>
                                <ul>
                                 {photosList}
                                </ul>
                            </div>
                    }
        </div>                    
    )   
    }
}

export default PhotoContainer;