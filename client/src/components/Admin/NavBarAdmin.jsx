import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar, Offcanvas} from 'react-bootstrap'

import axios from 'axios';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../../assets/css/Admin/NavBarAdmin.css'

const NavigationBarAdmin = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const url = import.meta.env.VITE_API_URL

  // Logout
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
    <>
      <div className="customNavbarAdmin">
        <Navbar expand="xl">
          <Container>
          <Row>
            <Col xl={12}>
              <Navbar.Brand>
                <img src='/image/logoSneaker.png' alt='logo'/>
                <p>Sneaker Shop</p>
              </Navbar.Brand>
            </Col>
            <Col xl={12}>
              <Navbar.Toggle onClick={handleShow}/>
              <Navbar.Collapse>
                <Nav className="flex-column">
                  <div className="customNavLink">
                    <div className="customManageAdmin">
                      <hr />
                      <h5>Manage</h5>
                      <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                      <Nav.Link onClick={() => navigate('/admin')}>Dashboard</Nav.Link>
                      <Nav.Link onClick={() => navigate('/admin/member')}>Member</Nav.Link>
                      <Nav.Link onClick={() => navigate('/admin/brand')}>Brand</Nav.Link>
                      <Nav.Link onClick={() => navigate('/admin/product')}>Product</Nav.Link>
                      <Nav.Link onClick={() => navigate('/admin/order')}>Order</Nav.Link>
                    </div>
                    <hr />
                    <div className="customLogout">
                      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </div>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
          </Container>
        </Navbar>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton closeVariant='white'>
            <Offcanvas.Title>
              <img src='/image/logoSneaker.png' alt='logo'/>
              <p>Sneaker Shop</p>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <div className="customNavLink">
                <div className="customManageAdmin">
                  <h5>Manage</h5>
                    <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                    <Nav.Link onClick={() => navigate('/admin')}>Dashboard</Nav.Link>
                    <Nav.Link onClick={() => navigate('/admin/member')}>Member</Nav.Link>
                    <Nav.Link onClick={() => navigate('/admin/brand')}>Brand</Nav.Link>
                    <Nav.Link onClick={() => navigate('/admin/product')}>Product</Nav.Link>
                    <Nav.Link onClick={() => navigate('/admin/order')}>Order</Nav.Link>
                </div>
                <hr />
                <div className="customLogout">
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </div>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  )
}

export default NavigationBarAdmin