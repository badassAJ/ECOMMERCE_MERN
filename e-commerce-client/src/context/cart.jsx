import { useState, useEffect, useContext, createContext } from "react";

// Create the ca rtcontext
const CartContext = createContext();


const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  useEffect(()=>{
    let exisitingCartItem = localStorage.getItem('cart');
    if(exisitingCartItem) setCart(JSON.parse(exisitingCartItem))
  },[])

  return (
    <CartContext.Provider value={[ cart, setCart ]}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the search context
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
