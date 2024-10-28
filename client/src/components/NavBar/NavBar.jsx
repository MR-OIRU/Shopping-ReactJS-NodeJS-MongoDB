import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../../assets/css/Navbar.css';

function NavBar() {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  axios.defaults.withCredentials = true

  const [login,setLogin] = useState({})
  useEffect(()=>{
    axios.get(`${url}navbar`).then((res) => {
      setLogin(res.data.user)
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
  },[])
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
                  <Nav.Link onClick={() => navigate('/')}>contact</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
          <Col xs={5} sm={4} md={3} lg={3} xl={2} className={login && login.Login === true ? "LoginTrue" : "LoginBox"}>
            <Button variant="warning" href="/login">Login</Button>
          </Col>
          <Col xs={8} sm={6} md={5} lg={3} xl={3} className={login && login.Role === 'User' && login.Login === true ? "UserLogin" : "UserBox"}>
            <div className="cart_Bx">
                <span className="cart_Num">0</span>
            </div>
            <div className="wishlist_Bx">
                <span className="wishlist_Num">0</span>
            </div>
            <div className="user_Bx">
              <Dropdown>
                <Dropdown.Toggle variant="warning">
                <BsPersonCircle />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item >Profile</Dropdown.Item>
                  <Dropdown.Item >Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
          <Col xs={3} sm={4} md={3} lg={3} xl={3} className={login && login.Role === 'Admin' && login.Login === true ? "AdminLogin" : "AdminBox"}>
            <div className="admin_Bx">
              <Dropdown>
                <Dropdown.Toggle variant="warning">
                <BsPersonCircle />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item >Dashboard</Dropdown.Item>
                  <Dropdown.Item >Logout</Dropdown.Item>
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
