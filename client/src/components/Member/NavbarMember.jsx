import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar, Offcanvas} from 'react-bootstrap'
import MemberEdit from './MemberEdit';
import axios from 'axios';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../../assets/css/Member/NavBarMember.css'

const NavbarMember = () => {
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
      <div className="customNavbarMember">
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
                    <div className="customManageMember">
                      <hr />
                      <h5>Manage</h5>
                      <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                        <div className="customProfile">
                            <Nav.Link onClick={() => navigate('/member')} className="profile">Profile</Nav.Link>
                            <p>
                                <MemberEdit />
                            </p>
                        </div>
                      <Nav.Link onClick={() => navigate('/member/order')}>Order</Nav.Link>
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
          <Offcanvas.Header closeButton closeVariant='white' className='memberHeader'>
            <Offcanvas.Title>
              <img src='/image/logoSneaker.png' alt='logo'/>
              <p>Sneaker Shop</p>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='memberBody'>
            <Nav className="flex-column">
                <div className="customNavLink">
                <div className="customManageMember">
                    <h5>Manage</h5>
                    <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                    <div className="customProfile">
                        <Nav.Link onClick={() => navigate('/member')} className="profile">Profile</Nav.Link>
                        <p>
                        <MemberEdit />
                        </p>
                    </div>
                    <Nav.Link onClick={() => navigate('/member/order')}>Order</Nav.Link>
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

export default NavbarMember