import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { usePrice } from './CartContext';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const navigate = useNavigate();
  const { price, setPrice, cart, addToCart } = usePrice(); 

  const loadPizzas = async () => {
    try {
      const response = await fetch('/src/data/pizzas.json');
      if (!response.ok) {
        throw new Error('Error al cargar la data');
      }
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPizzas();
  }, []);

  const navigateToPizzaDetails = (pizzaName) => {
    navigate(`/pizza/${pizzaName}`);
  };

  const addToCartLocal = (pizza) => {
    addToCart(pizza); 
    // conflicto de estilos
    toast('🦄 Pizza agregada a tu carrito!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      alert("Pizza agregada exitosamente")
  };

  return (
    <>
      <Navbar />
  
      <div className="banner">
        <h1>¡Pizzería Mamma Mia!</h1>
        <p>¡Tenemos las mejores pizzas que podrás encontrar!</p>
      </div>

      <div className="container mt-5">
      <div className="row custom-row">
          {pizzas.map((pizza) => (
            <div key={pizza.id} className="col-md-3 col-6 mb-4 custom-col">
              <div className="card">
                <img src={pizza.img} className="card-img-top" alt={pizza.name} />
                <h4 className="card-title">{pizza.name}</h4>
                <div className="card-body">
                  <hr />
                  <h6>Ingredientes:</h6>
                  <ul className='custom-ul'>
                    {pizza.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                  <hr />
                  <h4 className="text-center">$ {pizza.price}</h4>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => navigateToPizzaDetails(pizza.name)}
                    >
                      Ver más 
                      <img src="\src\img\eyes_icon.png" className="navBarIcon p-1" alt="Icono Ver" />
                    </button>

                    <button
                        className="btn btn-success mx-2"
                        onClick={() => addToCartLocal(pizza)} 
                        >
                        <img src="\src\img\cart_icono.png" className="navBarIcon" alt="Icono Añadir" />
                        Añadir
                     </button>
                    
                  
                  </div>
                </div>
              </div>
            </div>
            
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
