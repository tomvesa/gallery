import React, { useEffect, useState } from 'react';
import configQueryParams from './components/configQueryParams';
import { Routes , Route, useLocation, Navigate } from 'react-router-dom';



// App components
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';




function App() {
  
    const randomIndex = (arr) =>  Math.floor(Math.random() * arr.length); 
    const { searchDefault } = configQueryParams;
    const [searchValue, setSearchValue] = useState(searchDefault[randomIndex(searchDefault)]);
    
    const handleSearchValue = ( data ) => {
              setSearchValue( data );
              console.log({searchValue})
    }

    const location = useLocation();
    let locationSearch = location.search; 
  useEffect(()=>{      
    if(location.pathname === '/search/'){      
        setSearchValue(location.search.substring(1));
    }
      },[locationSearch])
      
    
    
  //  call Flickr for photos and pass the photos arra to search value


//handle 404 page  
  if(location.pathname === "/404"){
      return(
        <Routes>
        <Route path="/404" element={<NotFound />}  />
      </Routes>
    )
  } else {

      return (
        <div className='container'>
    
        {/* page elements */}
          <MainNav     onData={handleSearchValue}  />   
          <SearchForm   onData={handleSearchValue} />
            
          

          <Routes>
            <Route path="/" > 
              <Route index  element={<Navigate replace   to={"search/?" + searchDefault[randomIndex(searchDefault)]}/>} />
              <Route path="dogs"  element={<PhotoContainer search={ "dogs" }/>} />
              <Route path="cats"  element={<PhotoContainer search={ "cats" }/>} />
              <Route path="computers"  element={<PhotoContainer search={ "computers" }/>} />
            </Route>
            <Route path="search" element={<PhotoContainer search={ searchValue }/>} >
              <Route index element={<PhotoContainer search={ searchValue }/>} />
              <Route path="?:topic" element={<PhotoContainer search={ searchValue }/>} />
            </Route>

            {/* 404 page not found  Route*/}
            <Route path="/*"   element={<Navigate replace   to="/404"/>}  />

          </Routes>
        </div>
      );
}
}

export default App;
