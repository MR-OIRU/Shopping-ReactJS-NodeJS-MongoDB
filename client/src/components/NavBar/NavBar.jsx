import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { BsPersonCircle,BsCart,BsHeart } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useQuantityInCart,useQuantityInWishlist,useCartUser } from '../CartContext';

import Cart from './cartData/CartData';
import Wishlist from './cartData/WishlistData';
import axios from 'axios';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../../assets/css/Navbar.css';

function NavBar() {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  const { CartUser, setCartUser } = useCartUser();
  //cart
  const { QuantityInCart, setQuantityInCart } = useQuantityInCart();
  //wishlist
  const { QuantityInWishlist, setQuantityInWishlist } = useQuantityInWishlist();
  axios.defaults.withCredentials = true

  const [User,setUser] = useState({})

  useEffect(()=>{
    axios.get(`${url}navbar`).then((res) => {
      setUser(res.data.user.user)
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
  },[])

  useEffect(()=>{
    if(User && User.Role === 'User'){
        const user = User.Cart;
        const Token = `cart_${user}`;
        const Cart = {
          cart: [],
          wishlist: [],
          TotalQuantityInCart: 0,
          TotalPriceInCart: 0,
          TotalQuantityInWishlist: 0
        }
        const UserCart = JSON.parse(localStorage.getItem(Token)) || null
        if (!UserCart) {
          localStorage.setItem(Token, JSON.stringify(Cart));
        }else{
          setCartUser(User.Cart);
          setQuantityInCart(UserCart.TotalQuantityInCart)
          setQuantityInWishlist(UserCart.TotalQuantityInWishlist)
        }
    }
  },[User,QuantityInCart,QuantityInWishlist])
  
  const handleLogout = async () =>{
    axios.post(`${url}logout`).then((res)=>{
      if (res.status === 200) {
        withReactContent(Swal).fire({
          icon: "success",
          title: "Successfully",
          text:"Logout successfully!!.",
          timer: 1500,
          showConfirmButton: false
        }).then(()=>{
          window.location.href = '/'
        })
      }
    }).catch((err) => console.log(err))
  } 
  return (
    <div className="custom-navbar fixed-top">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={9} xl={9}>
            <Navbar expand="lg">
              <Navbar.Brand onClick={() => navigate('/')} className='logo'>
                <img src="/public/image/logoSneaker.png" alt="Logo"/>
                <p>Sneaker - SHOP</p>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                  <Nav.Link onClick={() => navigate('/product')}>Product</Nav.Link>
                  <Nav.Link href="https://oirudev.com/" target='_blank'>contact</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
          <Col xs={5} sm={4} md={3} lg={3} xl={2} className={User && User.Login === true ? "LoginTrue" : "LoginBox"}>
            <Button variant="warning" href="/login">Login</Button>
          </Col>
          <Col xs={8} sm={6} md={5} lg={3} xl={3} className={User && User.Role === 'User' && User.Login === true ? "UserLogin" : "UserBox"}>
            <div className="cart_Bx">
                <span className="cart_Num">{QuantityInCart}</span>
                <Cart />
            </div>
            <div className="wishlist_Bx">
                <span className="wishlist_Num">{QuantityInWishlist}</span>
                <Wishlist />
            </div>
            <div className="user_Bx">
              <Dropdown>
                <Dropdown.Toggle variant="warning">
                <BsPersonCircle />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate('/member')}>Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/member/order')}>Order</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
          <Col xs={3} sm={4} md={3} lg={3} xl={3} className={User && User.Role === 'Admin' && User.Login === true ? "AdminLogin" : "AdminBox"}>
            <div className="admin_Bx">
              <Dropdown>
                <Dropdown.Toggle variant="warning">
                <BsPersonCircle />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate('/admin')}>Dashboard</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/admin/member')}>Member</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/admin/brand')}>Brand</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/admin/product')}>Product</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/admin/order')}>Order</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NavBar;
