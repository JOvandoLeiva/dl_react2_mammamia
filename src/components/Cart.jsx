import React from 'react';
import { usePrice } from './CartContext';
import Navbar from './NavBar';

const Cart = () => {
  const { cart, removeFromCart, addToCart } = usePrice(); 
  let total = 0;

  const handleRemoveFromCart = (pizzaName) => {
    removeFromCart(pizzaName);
    alert("Pizza eliminada")

  };

  const handleAddToCart = (pizza) => {
    addToCart(pizza);
    alert("Pizza agregada!")
  };

  return (
    <>
      <Navbar />

      <div className="banner">
        <h1>Detalle de tu pedido</h1>
      </div>
      <div className="container detalles-pedido">

        {Object.values(cart).length > 0 ? (
          <ul className="list-group">
            {Object.values(cart).map((item, index) => {
              const itemTotal = item.pizza.price * item.quantity;
              total += itemTotal; 

              return (
               <>  
              
               <div>
               <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={item.pizza.img} alt={item.pizza.name} className="item-small" />
                    <div className="item-info">
                      <h5 className="card-title p-2">{item.pizza.name}</h5>
                    </div>
                  </div>
                        <div className="d-flex align-items-center">
                            <p className="item-price p-2">${itemTotal}</p> 
                                    <div className="quantity-controls">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveFromCart(item.pizza.name)}
                                 >
                                        -
                                    </button>
                                        <span className="quantity p-2">{item.quantity}</span>
                                    <button 
                                        className="btn btn-success"
                                        onClick={() => handleAddToCart(item.pizza)} 
                                    >
                                        +
                                    </button>
                                    </div>
                        </div>
                </li>
                </div>
               
               </>
                
              );
            })}
          </ul>
        
        ) : (
          <div className="text-center p-2">
            <h2 className='p-2'>Tu carrito está vacío. ¡Añade algunas pizzas!</h2>
            <div className="text-center"> 
              <img src="/src/img/pizzas.jpg" className="img-rounded" alt="Pizzas" />
            </div>
          </div>
        )}
        {Object.values(cart).length > 0 && ( 
          <div className="text-end">
          <h5 className='p-2'>Total: $ {total}</h5>
          <button className="btn btn-success mb-5">Ir a Pagar</button>
        </div>
        
        )}
      </div>
    </>
  );
};

export default Cart;
