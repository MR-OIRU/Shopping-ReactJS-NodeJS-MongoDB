import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Modal, Form } from 'react-bootstrap'

import axios from 'axios';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Validation from '../../../assets/js/ValidationBrand';

const InsertBrand = () => {
  const url = import.meta.env.VITE_API_URL

  const [brandID, setBrandID] = useState('')
  const [values, setValues] = useState({
    BrandID:"",
    BrandName:""
  })

  const resetForm = () => {
    setValues({
        BrandID:"",
        BrandName:""
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

  useEffect(()=>{
    if(show){
      axios.post(`${url}admin/brand`).then((res) => {
        setBrandID(res.data)
        setValues(prev => ({
          ...prev,
          BrandID: res.data
      }));
      })
    }
  },[show])

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post(`${url}admin/brand/insert`, values).then((res)=>{
      if(res.data.message === 'InsetBrand success'){
        withReactContent(Swal).fire({
            icon: "success",
            title: "Successfully!!",
            text: "Insert Brand success",
            confirmButtonColor: "#04AA6D",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
    }).catch((err) => {
      if (err.response) {
        if (err.response.data.message === 'BrandID already exists!!') {
            withReactContent(Swal).fire({
                icon: "error",
                title: "BrandID is already",
                text: "please choose BrandID another one!",
                showConfirmButton: false,
                timer: 2000
              }).then(() => document.querySelector('.customModal').focus());
        }else if (err.response.data.message === 'BrandName already exists!!'){
            withReactContent(Swal).fire({
                icon: "error",
                title: "BrandName is already",
                text: "please choose BrandName another one!",
                showConfirmButton: false,
                timer: 2000
              }).then(() => document.querySelector('.customModal').focus());
        }else{
          withReactContent(Swal).fire({
            icon: "error",
            title: "Error!!",
            text: "Insert Brand failed!",
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
          <Modal.Title> เพิ่มข้อมูล Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={12} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Brand ID</Form.Label>
                                <Form.Control type="text" onChange={handleInput} name="BrandID" disabled value={brandID}/>
                            </Form.Group>
                        </Col>
                        <Col md={12} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control type="text" onChange={handleInput} name="BrandName"
                                className={`${errors.BrandName === '' ? 'default' : errors.BrandName === 'Info submitted' ? 'Text' : 'errText'}`}/>
                                <p className='text-error mt-3 text-center'>{errors.BrandName === '' || errors.BrandName === 'Info submitted' ? '' : errors.BrandName}</p>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="customSubmit">
                        <Button variant="danger" onClick={() => { handleClose(); resetForm(); }}>
                            Close
                        </Button>
                        <Button variant='success' disabled={isButtonDisabled()} type='submit'>Insert Brand</Button>
                    </div>
                </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default InsertBrand