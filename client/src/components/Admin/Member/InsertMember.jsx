import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Modal, Form } from 'react-bootstrap'

import axios from 'axios';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Validation from '../../../assets/js/Validation';

const InsertMember = () => {
  const url = import.meta.env.VITE_API_URL

  const [values, setValues] = useState({
    Role:"default",
    Username:"",
    Email:"",
    FirstName:"",
    LastName:"",
    Sex:"default",
    Phone:"",
    Password:"",
    confirmPassword:""
  })

  const resetForm = () => {
    setValues({
      Role:"default",
      Username:"",
      Email:"",
      FirstName:"",
      LastName:"",
      Sex:"default",
      Phone:"",
      Password:"",
      confirmPassword:""
    });
  };

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

  const [errors, setErrors] = useState({})

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleInsert = () => setShow(true);

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post(`${url}admin/member/insert`, values).then((res)=>{
      if(res.data.message === 'InsetMember success'){
        withReactContent(Swal).fire({
            icon: "success",
            title: "Successfully!!",
            text: "Insert Member success",
            confirmButtonColor: "#04AA6D",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
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
              }).then(() => document.querySelector('.customModal').focus());
        }else if (err.response.data.message === 'Email already exists!!'){
            withReactContent(Swal).fire({
                icon: "error",
                title: "Email is already",
                text: "please choose email another one!",
                showConfirmButton: false,
                timer: 2000
              }).then(() => document.querySelector('.customModal').focus());
        }else{
          withReactContent(Swal).fire({
            icon: "error",
            title: "Error!!",
            text: "Insert Member failed!",
            showConfirmButton: false,
            timer: 2000
          }).then(() => document.querySelector('.customModal').focus());
        }
      } else {
        console.log('Error:', err.message);
      }
    })
  }

  return (
    <>
      <Button variant='success' onClick={handleInsert}> เพิ่มข้อมูล</Button>
      <Modal 
            show={show} 
            onHide={() => { handleClose(); resetForm(); }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName='customModal'                    
        >
        <Modal.Header closeButton>
          <Modal.Title> เพิ่มข้อมูล Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select name="Role" onChange={handleInput} value={values.Role}
                                className={`${errors.Role === '' ? 'default' : errors.Role === 'Info submitted' ? 'Text' : 'errText'}`}>
                                    <option value="">Select Role</option>
                                    <option value="Admin">Administrator</option>
                                    <option value="User">User</option>
                                </Form.Select>
                                <p className='text-error mt-3 text-center'>{errors.Role === '' || errors.Role === 'Info submitted' ? '' : errors.Role}</p>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
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
                                <p className='text-error mt-3 text-center'>{errors.FirstName === '' || errors.FirstName === 'Info submitted' ? '' : errors.FirstName}</p>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" onChange={handleInput} name="LastName" 
                                className={`${errors.LastName === '' ? 'default' : errors.LastName === 'Info submitted' ? 'Text' : 'errText'}`}/>
                                <p className='text-error mt-3 text-center'>{errors.LastName === '' || errors.LastName === 'Info submitted' ? '' : errors.LastName}</p>
                            </Form.Group>
                        </Col>
                        
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
                                <p className='text-error mt-3 text-center'>{errors.Phone === '' || errors.Phone === 'Info submitted' ? '' : errors.Phone}</p>
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
                                <p className='text-error mt-3 text-center'>{errors.Sex === '' || errors.Sex === 'Info submitted' ? '' : errors.Sex}</p>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={handleInput} name="Password" autoComplete="password" 
                                className={`${errors.Password === '' ? 'default' : errors.Password === 'Info submitted' ? 'Text' : 'errText'}`}/>
                                <p className='text-error mt-3 text-center'>{errors.Password === '' || errors.Password === 'Info submitted' ? '' : errors.Password}</p>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" onChange={handleInput} name="confirmPassword" autoComplete="confirmPassword" 
                                className={`${errors.confirmPassword === '' ? 'default' : errors.confirmPassword === 'Info submitted' ? 'Text' : 'errText'}`}/>
                                <p className='text-error mt-3 text-center'>{errors.confirmPassword === '' || errors.confirmPassword === 'Info submitted' ? '' : errors.confirmPassword}</p>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="customSubmit">
                        <Button variant="danger" onClick={() => { handleClose(); resetForm(); }}>
                            Close
                        </Button>
                        <Button variant='success' disabled={isButtonDisabled()} type='submit'>Insert Member</Button>
                    </div>
                </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default InsertMember