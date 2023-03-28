import React from "react";
import { NavLink } from "react-router-dom";


const NotFound = () => {
    return (
        <div>
            <h1>Oh no! Page not found</h1>
            <ul>    
                <li><NavLink to="/">Back to Mainpage</NavLink></li>
            </ul>
        </div>
      
    )
}

export default NotFound;