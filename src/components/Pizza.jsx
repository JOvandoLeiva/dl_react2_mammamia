import Navbar from "./NavBar";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePrice } from "./CartContext";


const Pizza = () => {
  const { name } = useParams();
  const [pizza, setPizza] = useState(null);
  const { price, setPrice, cart, addToCart } = usePrice(); 


  const findPizzaByName = (pizzas, name) => {
    return pizzas.find((pizza) => pizza.name === name);
  };
  
  useEffect(() => {
    fetch('/src/data/pizzas.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar la data');
        }
        return response.json();
      })
      .then((data) => {
        const foundPizza = findPizzaByName(data, name);
        setPizza(foundPizza);
      })
      .catch((error) => {
        console.error(error);
        alert('Hubo un error al cargar los datos');
      });
  }, [name]);
  
  if (!pizza) {
    return <p>Buscando ingredientes...</p>;
  }
  

  const addToCartLocal = (pizza) => {
    addToCart(pizza); 
    alert("Pizza agregada exitosamente")
   
  };


  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={pizza.img} className="img-fluid rounded-start" alt={pizza.name} />
                </div>
            <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{pizza.name}</h5>
                        <p className="card-text">Descripción: {pizza.desc}</p>
                        <p className="card-text">Ingredientes: {pizza.ingredients.join(", ")}</p>
                        <p className="card-text">Precio: $ {pizza.price}</p>
                    </div>
                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-primary mx-2"
                        onClick={() => addToCartLocal(pizza)} 
                    >
                        <img src="\src\img\cart_icono.png" className='navBarIcon' alt="Icono Añadir" />
                        Añadir
                    </button>
                </div>
                
                
            </div>
        </div>
  </div>
</div>


    </>
  );
};

export default Pizza;
