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

//set a value to search for    
    const handleSearchValue = ( data ) => {
              setSearchValue( data );
    }

//if on search page, set search value from url search param     
const location = useLocation();
  useEffect(()=>{   
    let locationSearch = location.search;    
    if(location.pathname === '/search/'){      
        setSearchValue(locationSearch.substring(1));
    }
      },[location]);
      
    
//handle 404 page  if not 404 render regular page
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
              <Route index  element={<Navigate replace   to={"home/" }/>} />
              <Route path="home"  element={<PhotoContainer search={ searchDefault[randomIndex(searchDefault)] }/>} />
              <Route path="dogs"  element={<PhotoContainer search={ "dogs" }/>} />
              <Route path="cats"  element={<PhotoContainer search={ "cats" }/>} />
              <Route path="computers"  element={<PhotoContainer search={ "computers" }/>} />
            </Route>
            <Route path="search" element={<PhotoContainer search={ searchValue }/>} >
              <Route index element={<PhotoContainer search={ searchValue }/>} />
              <Route path="?:topic" element={<PhotoContainer search={ searchValue }/>} />
            </Route>

            {/* If route not found redirect to 404 page*/}
            <Route path="/*"   element={<Navigate replace   to="/404"/>}  />

          </Routes>
        </div>
      );
}
}

export default App;
