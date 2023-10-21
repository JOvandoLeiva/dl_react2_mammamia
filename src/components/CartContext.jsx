import React, { createContext, useContext, useState } from 'react';

const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState({});
  
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
  
      if (updatedCart[pizza.name]) {
        updatedCart[pizza.name].quantity += 1;
      } else {
        updatedCart[pizza.name] = { pizza, quantity: 1 };
      }
  
      const totalPrice = Object.values(updatedCart).reduce(
        (total, item) => total + item.pizza.price * item.quantity,
        0
      );
  
      setPrice(totalPrice); 

    
      return updatedCart;
    });
  };

  const removeFromCart = (pizzaName) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
  
      if (updatedCart[pizzaName]) {
        if (updatedCart[pizzaName].quantity > 1) {
          updatedCart[pizzaName].quantity -= 1;
        } else {
          delete updatedCart[pizzaName];
        }
  
        const totalPrice = Object.values(updatedCart).reduce(
          (total, item) => total + item.pizza.price * item.quantity,
          0
        );
  
        setPrice(totalPrice); 
      }
  
      return updatedCart;
    });
  };
  

  return (
    
    <PriceContext.Provider value={{ price, setPrice, cart, addToCart, removeFromCart }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = () => {
  return useContext(PriceContext);
};
