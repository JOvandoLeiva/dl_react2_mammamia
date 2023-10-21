import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';

const NotFound = () => {
  
  return (
    <>
      <Navbar />
  
      <div className="banner">
        <h1>¡Pizzería Mamma Mia!</h1>
        <p>¡Tenemos las mejores pizzas que podrás encontrar!</p>
      </div>

      <h1 className='p-2'>Ups! está página aún no existe</h1>
     
    </>
  );
};

export default NotFound;
