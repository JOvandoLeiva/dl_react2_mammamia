
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css';
import Pizza from './components/Pizza';
import { PriceProvider } from './components/CartContext';
import Cart from './components/Cart';
import NotFound from './components/NotFound';

function App() {


  return (
    <>
      <PriceProvider>
              <Routes>

                <Route path="/" element={<Home />}  />
                <Route path="/pizza/:name" element={<Pizza />}  />
                <Route path="/carrito/" element={<Cart />}  />
                <Route path="*" element={<NotFound />}  />
              
              </Routes>
      </PriceProvider>
     
    </>
  )
}

export default App
