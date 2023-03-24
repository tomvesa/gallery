import React, { useEffect, useState } from 'react';
import config from './components/config';
import configQueryParams from './components/configQueryParams';




// App components
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';
import { Routes , Route } from 'react-router-dom';








function App() {

  const randomIndex = (arr) =>  Math.floor(Math.random() * arr.length);  
  const { apiKey } = config 
  const { baseUrl,
          perPage, 
          outputFormat,
          searchDefault
                        } = configQueryParams;

    const [photos, setPhotos] = useState([]);
    const [searchValue, setSearchValue] = useState(searchDefault[randomIndex(searchDefault)]);
    
    const handleSearchValue = ( data ) => {
              setSearchValue( data );
              //console.log({searchValue})
    }

  //  call Flickr for photos and pass the photos arra to search value
    useEffect(() => {
              fetch(`${baseUrl}&api_key=${apiKey}&tags=${searchValue}&per_page=${perPage}&page=&format=${outputFormat}&nojsoncallback=1`)
              .then(response => response.json())
              .then(json =>     {
                                //console.log("JSON:", json);
                                setPhotos( json.photos.photo)
                                console.log(`searching for: ${searchValue}`);
                              })
              .catch(error => console.log("error Fetching data ", error));
          },[searchValue]);  //fetch only when searchValue has changed


  return (
    <div className='container'>
 
    {/* page elements */}
      <SearchForm  onData={handleSearchValue}  />
      <MainNav     onData={handleSearchValue}  />      
      

      <Routes>
        <Route path="/" element={<PhotoContainer photos={ photos }/>}/>
        <Route path="/:topic"  element={<PhotoContainer photos={ photos }/>} />
        <Route path="/search/:topic" element={<PhotoContainer photos={ photos }/>} />

      </Routes>
    </div>
  );
}

export default App;
