import React,{ useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Validation from '../../assets/js/Validation';
import '../../assets/css/Form_Register.css'

function Form_Register() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const [values, setValues] = useState({
    Role:"User",
    Username:"",
    Email:"",
    FirstName:"",
    LastName:"",
    Sex:"default",
    Phone:"",
    Password:"",
    confirmPassword:""
  })
  
  const [errors, setErrors] = useState({})

  const handleInput = (e) =>{
    const { name, value } = e.target;
      setValues(prev =>({
          ...prev, [name]: value === "" ? "" : value
      }))
  }

  useEffect(()=>{
    setErrors(Validation(values));
  },[values])

  const isButtonDisabled = () =>{
    return Object.values(errors).some(error => error !== "Info submitted");
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post(`${url}register`,values).then((res) => {
        if(res.data.message === 'Register success'){
            withReactContent(Swal).fire({
                icon: "success",
                title: "Successfully!!",
                text: "Register success",
                confirmButtonColor: "#04AA6D",
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
              });
        }
    }).catch((err) => {
        if (err.response) {
            if (err.response.data.message === 'Username already exists!!') {
                withReactContent(Swal).fire({
                    icon: "error",
                    title: "Username is already",
                    text: "please choose username another one!",
                    showConfirmButton: false,
                    timer: 2000
                  })
            }else if (err.response.data.message === 'Email already exists!!'){
                withReactContent(Swal).fire({
                    icon: "error",
                    title: "Email is already",
                    text: "please choose email another one!",
                    showConfirmButton: false,
                    timer: 2000
                  })
            }else{
                withReactContent(Swal).fire({
                    icon: "error",
                    title: "Register Failed!!",
                    text: "please try again.",
                    showConfirmButton: false,
                    timer: 2000
                  })
            }
          } else {
            console.log('Error:', err.message);
          }
    })
  } 
  return (
    <div className="customFormRegister">
      <Container>
        <Row className='customBox'>
          <Col xs={12} md={4} className="leftBox">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vel. Repudiandae, ex nobis vel blanditiis eligendi iste eaque soluta quae quis ad omnis nemo dignissimos itaque amet molestiae cumque deserunt maxime, officia enim! Ipsum, omnis.</p>
          </Col>
          <Col xs={12} md={8} className="rightBox">
          <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" onChange={handleInput} name="Username" 
                                className={`${errors.Username === '' ? 'default' : errors.Username === 'Info submitted' ? 'Text' : 'errText'}`}/>
                                <p className='text-error mt-3 text-center'>{errors.Username === '' || errors.Username === 'Info submitted' ? '' : errors.Username}</p>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" onChange={handleInput} name="FirstName" 
                                className={`${errors.FirstName === '' ? 'default' : errors.FirstName === 'Info submitted' ? 'Text' : 'errText'}`}/>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" onChange={handleInput} name="LastName" 
                                className={`${errors.LastName === '' ? 'default' : errors.LastName === 'Info submitted' ? 'Text' : 'errText'}`}/>
                            </Form.Group>
                        </Col>
                        <span className='text-error text-center'>{errors.FirstName === '' || errors.FirstName === 'Info submitted' ? '' : errors.FirstName}</span>
                        <span className='text-error text-center'>{errors.LastName === '' || errors.LastName === 'Info submitted' ? '' : errors.LastName}</span>
                        
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" onChange={handleInput} name="Email" 
                                className={`${errors.Email === '' ? 'default' : errors.Email === 'Info submitted' ? 'Text' : 'errText'}`}/>
                                <p className='text-error mt-3 text-center'>{errors.Email === '' || errors.Email === 'Info submitted' ? '' : errors.Email}</p>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" onChange={handleInput} name="Phone" placeholder='000-0000-000' maxLength={10} 
                                className={`${errors.Phone === '' ? 'default' : errors.Phone === 'Info submitted' ? 'Text' : 'errText'}`}/>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Sex</Form.Label>
                                <Form.Select name="Sex" onChange={handleInput} value={values.Sex}
                                className={`${errors.Sex === '' ? 'default' : errors.Sex === 'Info submitted' ? 'Text' : 'errText'}`}>
                                    <option value="">Select Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <span className='text-error text-center'>{errors.Phone === '' || errors.Phone === 'Info submitted' ? '' : errors.Phone}</span>
                        <span className='text-error text-center'>{errors.Sex === '' || errors.Sex === 'Info submitted' ? '' : errors.Sex}</span>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={handleInput} name="Password" autoComplete="password" 
                                className={`${errors.Password === '' ? 'default' : errors.Password === 'Info submitted' ? 'Text' : 'errText'}`}/>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" onChange={handleInput} name="confirmPassword" autoComplete="confirmPassword" 
                                className={`${errors.confirmPassword === '' ? 'default' : errors.confirmPassword === 'Info submitted' ? 'Text' : 'errText'}`}/>
                            </Form.Group>
                        </Col>
                        <span className='text-error text-center'>{errors.Password === '' || errors.Password === 'Info submitted' ? '' : errors.Password}</span>
                        <span className='text-error text-center'>{errors.confirmPassword === '' || errors.confirmPassword === 'Info submitted' ? '' : errors.confirmPassword}</span>
                    
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Text>
                            <a href="/login">Already have an Account ? login</a>
                        </Form.Text>
                    </Form.Group>
                    <Button variant='success' disabled={isButtonDisabled()} type='submit'>Register</Button>
                </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Form_Register