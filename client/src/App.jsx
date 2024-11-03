import Login from './page/Login'
import Register from './page/Register'
import Home from './page/Home'
import Product from './page/Product';
import Cart from './page/Cart';
import CheckOut from './page/CheckOut';
import Admin from './page/Admin/Admin';
import AdminMember from './page/Admin/AdminMember';
import AdminBrand from './page/Admin/AdminBrand';
import AdminProduct from './page/Admin/AdminProduct';
import AdminOrder from './page/Admin/AdminOrder';

import Member from './page/Member/Member';

import { CartProvider } from './components/CartContext'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <>
    <CartProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/checkout" element={<CheckOut />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/member" element={<AdminMember />} />
            <Route path="/admin/brand" element={<AdminBrand />} />
            <Route path="/admin/product" element={<AdminProduct />} />
            <Route path="/admin/order" element={<AdminOrder />} />

            <Route path="/member" element={<Member />} />
          </Routes>
      </Router>
    </CartProvider>
    </>
  )
}

export default App
