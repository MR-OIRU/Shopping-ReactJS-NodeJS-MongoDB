import React, { useState, useEffect } from 'react'
import { BsGear } from "react-icons/bs";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

import axios from 'axios'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../../assets/css/Member/NavBarMember.css'

const MemberEdit = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};

    const [modalUser,setModalUser] = useState({})
    const [edit, setEdit] = useState({})
    const url = import.meta.env.VITE_API_URL
    useEffect(() => {
        if(show){
            axios.post(`${url}member/edit`).then((res)=>{
                setModalUser(res.data)
                setEdit(res.data)
            }).catch((err) => console.log(err))
        }
    },[show])

    const handleChange = (e) =>{
        const { name , value } = e.target
        setEdit(prev => ({
          ...prev,[name]: value
        }))
      }
    const handleSubmit = (e) =>{
        e.preventDefault()
        const OldEmail = modalUser.Email
        const Data = edit
        axios.post(`${url}member/update`, { OldEmail, Data }).then((res)=>{
            if(res.data.message === 'Update Member By Username success!!'){
                withReactContent(Swal).fire({
                    icon: "success",
                    title: "Update Successfully!!",
                    text: `Username By ${edit.Username}`,
                    confirmButtonColor: "#04AA6D",
                    }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                    });
            }
        }).catch((err) => {
            if(err.response.data.message === 'This email is already in use by another user in the system.'){
                withReactContent(Swal).fire({
                    icon: "error",
                    title: "Update failed",
                    html: `This email is already in use <br>By another user in the system.`,
                    showConfirmButton: false,
                    timer: 3000
                  }).then(() => document.querySelector('.customModal').focus());
            }else if(err.response.data.message === 'Value is required!!'){
                withReactContent(Swal).fire({
                    icon: "error",
                    title: "Update failed",
                    html: `Value is required!!`,
                    showConfirmButton: false,
                    timer: 3000
                  }).then(() => document.querySelector('.customModal').focus());
            }else{
                withReactContent(Swal).fire({
                    icon: "error",
                    title: "Update failed",
                    html: `Update Member By Username Error!!`,
                    showConfirmButton: false,
                    timer: 3000
                  }).then(() => document.querySelector('.customModal').focus());
            }
            console.log(err.response.data.message)
        })
    }
  return (
    <>
     <BsGear className='customSetting' onClick={handleShow}/>
     <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName='customModal'
      >
        <Modal.Header closeButton>
          <Modal.Title> Member : {modalUser.FirstName || ''} {modalUser.LastName || ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col sm={6} md={6} lg={6}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="Username" value={edit.Username || '' } onChange={handleChange} disabled/>
                        </Form.Group>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="Email" value={edit.Email || '' } onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="FirstName" value={edit.FirstName || '' } onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="LastName" value={edit.LastName || '' } onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="Phone" value={edit.Phone || '' } onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <Form.Group className="mb-3" controlId="sex">
                            <Form.Label>Sex</Form.Label>
                            <Form.Select name="Sex" value={edit.Sex || ''}  onChange={handleChange}>
                                <option value="" disabled>Select Sex</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="customBtn">
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" type="submit">Update</Button>
                </div>
            </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default MemberEdit