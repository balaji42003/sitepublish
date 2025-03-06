import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DealerLogin from './pages/DealerLogin';
import CustomerLogin from './pages/CustomerLogin';
import DealerDashboard from './pages/DealerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Navbar from './components/Navbar';
import RentItem from './RentItem';
import View from './View';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Rent from './Rent';
import MyOrders from './pages/MyOrders'; // Correct import path
import Sellitem from './Sellitem';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import MyOrders from './pages/MyOrders';
import Sellitem from './Sellitem';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs'; // Import the new ContactUs page

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, parseInt(quantity) || 0) }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <Router>
      <div>
        <Navbar cart={cart} />
        <Routes>
          <Route path="/sitepublish/" element={<Home />} />
          <Route path="/dealer-login" element={<DealerLogin />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/dealer-dashboard" element={<DealerDashboard />} />
          <Route 
            path="/customer-dashboard" 
            element={
              <CustomerDashboard 
                cart={cart}
                addToCart={addToCart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            } 
          />
          <Route path="/sell" element={<Sellitem />} />
          <Route path="/rent-item" element={<RentItem />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/view" element={<View addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
          <Route path="/rent" element={<Rent />} /> {/* Add the new route */}
          <Route path="/my-orders" element={<MyOrders />} /> {/* Add the new MyOrders route */}
        </Routes>
        <Footer/>
      </div>
      
    </Router>
          <Route path="/rent" element={<Rent />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/contact-us" element={<ContactUs />} /> {/* Add the new ContactUs route */}
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;