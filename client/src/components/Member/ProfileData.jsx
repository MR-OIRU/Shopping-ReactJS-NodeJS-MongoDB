import React,{ useEffect, useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap';

import axios from 'axios';

import '../../assets/css/Member/ProfileData.css'

const ProfileData = () => {
  const url = import.meta.env.VITE_API_URL
  const [user, setUser] = useState({})
  const [OrderConfirmed, setOrderConfirmed] = useState(null)
  const [OrderNotConfirmed, setOrderNotConfirmed] = useState(null)
  useEffect(()=>{
      axios.post(`${url}member`).then((res) =>{
        setUser(res.data.User)
        setOrderConfirmed(res.data.ConfirmedCount)
        setOrderNotConfirmed(res.data.notConfirmedCount)
      }).catch((err) => console.log("Error fetching data:", err))
  },[])
  return (
    <> 
      <section className='customProfile'>
          <Container>
            <div className="customUserIcon">
              <img src='/public/image/userIcon.png' alt='user'/>
              <h2>Welcome : {user.FirstName || ''} {user.LastName || ''}</h2>
            </div>
            <Form className='customForm'>
              <Row>
              <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="Username" value={user.Username || ""} disabled/>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="Email" value={user.Email || ""} disabled/>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="FirstName" value={user.FirstName || ""} disabled/>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="LastName" value={user.LastName || ""} disabled/>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="Phone" value={user.Phone || ""} disabled/>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Sex</Form.Label>
                    <Form.Control type="text" name="Sex" value={user.Sex || ""} disabled/>
                  </Form.Group>
                </Col>
              </Row>
              <div className='customConfirmation'>
                <Row>
                  <Col sm={6} md={6} lg={6}>
                    <Form.Group className="mb-3" controlId="lastName">
                      <Form.Label>Order awaiting confirmation</Form.Label>
                      <Form.Control type="text" className="NotConfirmation" name="NotConfirmation" value={OrderNotConfirmed || 0 } disabled/>
                    </Form.Group>
                  </Col>
                  <Col sm={6} md={6} lg={6}>
                    <Form.Group className="mb-3" controlId="lastName">
                      <Form.Label>Order confirmation</Form.Label>
                      <Form.Control type="text" className="Confirmation" name="OrderConfirmation" value={OrderConfirmed || 0 } disabled/>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Form>
          </Container>
      </section>
    </>
  )
}

export default ProfileData