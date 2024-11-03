import React, { createContext, useContext, useState } from 'react';

//สร้าง DataContext In Username
const UsernameContext = createContext();
//สร้าง DataContext In CartUser
const CartUserContext = createContext();

// สร้าง DataContext In Cart
const QuantityInCartContext = createContext();
const ProductInCartContext = createContext();
const PriceInCartContext = createContext();

// สร้าง DataContext In Wishlist
const QuantityInWishlistContext = createContext();
const ProductInWishlistContext = createContext();

// สร้าง provider ที่จะห่อ component 
export const CartProvider = ({ children }) => {
    const [Username, setUsername] = useState('')
    //CartUser
    const [CartUser, setCartUser] = useState('')

    //Cart
    const [QuantityInCart, setQuantityInCart] = useState(0);
    const [ProductInCart, setProductInCart] = useState([]);
    const [PriceTotalInCart, setPriceTotalInCart] = useState({});

    //Wishlist
    const [QuantityInWishlist, setQuantityInWishlist] = useState(0);
    const [ProductInWishlist, setProductInWishlist] = useState([]);

  return (
    <UsernameContext.Provider value={{ Username, setUsername }}>
    <CartUserContext.Provider value={{ CartUser, setCartUser }}>
      <QuantityInCartContext.Provider value={{ QuantityInCart, setQuantityInCart }}>
        <ProductInCartContext.Provider value={{ ProductInCart, setProductInCart }}>
          <PriceInCartContext.Provider value={{ PriceTotalInCart, setPriceTotalInCart }}>
            <QuantityInWishlistContext.Provider value={{ QuantityInWishlist, setQuantityInWishlist }}>
              <ProductInWishlistContext.Provider value={{ ProductInWishlist, setProductInWishlist }}>
                    {children}
              </ProductInWishlistContext.Provider>
            </QuantityInWishlistContext.Provider>
          </PriceInCartContext.Provider>
        </ProductInCartContext.Provider>
      </QuantityInCartContext.Provider>
    </CartUserContext.Provider>
    </UsernameContext.Provider>

  );
};
export const useUsername = () => useContext(UsernameContext);
export const useCartUser = () => useContext(CartUserContext);
export const useQuantityInCart = () => useContext(QuantityInCartContext);
export const useProductInCart = () => useContext(ProductInCartContext);
export const usePriceInCart = () => useContext(PriceInCartContext);
export const useQuantityInWishlist = () => useContext(QuantityInWishlistContext);
export const useProductInWishlist = () => useContext(ProductInWishlistContext);