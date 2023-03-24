import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MainNav = ({ onData }) => {

  const navigate = useNavigate();

  const handleButtonSearch = (topic)=>{
        onData(topic); 
        navigate(`/search/${topic}`)
  }

   return (
    <nav className="main-nav">
    <ul>
      <li><NavLink to='cats'      onClick={ e => { handleButtonSearch("cats")}}>Cats</NavLink></li>
      <li><NavLink to='dogs'      onClick={ e => { handleButtonSearch("dogs")}}>Dogs</NavLink></li>
      <li><NavLink to='computers' onClick={ e => { handleButtonSearch("computers")}}>Computers</NavLink></li>
    </ul>
  </nav>
   )
}

export default MainNav;