import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { usePrice } from './CartContext';

export default function Navbar() {
  const setActiveClass = ({ isActive }) => (isActive ? 'active' : 'nav-link');
  const [cartValue, setCartValue] = useState(0);
  const { price } = usePrice();

  const pageTitle = "Mamma Mia! C'est délicieux !";
  const faviconPath = '/src/img/icono_pizza.png';

  useEffect(() => {
    document.title = pageTitle;
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = faviconPath;
  }, []);

  useEffect(() => {
    setCartValue(price);
  }, [price]);

  return (
    <nav className="navbar bg-light fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src="/src/img/icono_pizza.png" alt="Icono" className="navBarIcon" />
          <NavLink exact to="/" className={setActiveClass} activeClassName="active">
            Pizzería Mamma Mia!
          </NavLink>
        </div>
        <NavLink to="/carrito" className="nav-link">
          <img src="\src\img\cart_icono.png" alt="Icono" className="navBarIcon" />
          <span id="cartValue" className="bt-3">$ {cartValue} CLP</span>
        </NavLink>
      </div>
    </nav>
  );
}
