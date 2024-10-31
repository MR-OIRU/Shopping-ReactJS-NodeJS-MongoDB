import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Modal, Form, FormSelect } from 'react-bootstrap'

import axios from 'axios';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const InsertProduct = () => {
  const url = import.meta.env.VITE_API_URL

  const [values, setValues] = useState({})
  const [brands, setBrands] = useState([])
  const [productID, setProductID] = useState('')

  const handleInput = (e) =>{
    const { name, type, files, value } = e.target;
        if (type === 'file') {
          setValues(prev => ({
            ...prev, [name]: files[0]
          }));
        } else {
          setValues(prev => ({
            ...prev, [name]: value
          }));
        }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleInsert = () => setShow(true);

  useEffect(()=>{
    if(show){
      axios.post(`${url}admin/product`).then((res) => {
        setBrands(res.data.Brands || []);
        setProductID(res.data.ProductID || '');
      })
    }
  },[show])

  useEffect(() => {
    if (productID) {
      setValues(prev => ({
        ...prev,
        ProductID: productID
      }));
    }
  }, [productID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in values) {
        formData.append(key, values[key]);
    }

    axios.post(`${url}admin/product/insert`, formData)
        .then((res) => {
          if(res.data.message === 'Inset Product success'){
            withReactContent(Swal).fire({
                icon: "success",
                title: "Successfully!!",
                text: "Inset Product success",
                confirmButtonColor: "#04AA6D",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.message === 'Value is required!!') {
              withReactContent(Swal).fire({
                icon: "error",
                title: "Update failed",
                html: `Value is required!!`,
                showConfirmButton: false,
                timer: 3000
              }).then(() => document.querySelector('.customModal').focus());
            }else if (err.response.data.message === 'File size exceeds the limit of 2MB'){
                withReactContent(Swal).fire({
                    icon: "error",
                    title: "Error!!",
                    text: "File size exceeds the limit of 2MB !!",
                    showConfirmButton: false,
                    timer: 2000
                  }).then(() => document.querySelector('.customModal').focus());
            }else if (err.response.data.message === 'Only images are allowed (jpeg, jpg, png)'){
              withReactContent(Swal).fire({
                icon: "error",
                title: "Error!!",
                text: "Only images are allowed (jpeg, jpg, png) !!",
                showConfirmButton: false,
                timer: 2000
              }).then(() => document.querySelector('.customModal').focus());
            }else if (err.response.data.message === 'No files uploaded'){
              withReactContent(Swal).fire({
                icon: "error",
                title: "Error!!",
                text: "No files uploaded !!",
                showConfirmButton: false,
                timer: 2000
              }).then(() => document.querySelector('.customModal').focus());
            }else{
              withReactContent(Swal).fire({
                icon: "error",
                title: "Error!!",
                text: "Inset Product Failed!!",
                showConfirmButton: false,
                timer: 2000
              }).then(() => document.querySelector('.customModal').focus());
            }
          } else {
            console.log('Error:', err.message);
          }
        });
  };

  return (
    <>
      <Button variant='success' onClick={handleInsert}> เพิ่มข้อมูล</Button>
      <Modal 
            show={show} 
            onHide={() => { handleClose();}}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName='customModal'                    
        >
        <Modal.Header closeButton>
          <Modal.Title> เพิ่มข้อมูล Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                      <Form.Label>ID</Form.Label>
                      <Form.Control type="text" name="ProductID" onChange={handleInput} value={productID} disabled/>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                      <Form.Label>Brand</Form.Label>
                      <Form.Select name="ProductBrand" onChange={handleInput}>
                        <option value="">Select Brand</option>
                        {brands.map((item,index) => (
                          <option key={index} value={item.BrandID}>
                            {item.BrandName}
                          </option>
                        ))}
                      </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                      <Form.Label> Name</Form.Label>
                      <Form.Control type="text" name="ProductName" onChange={handleInput}/>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                      <Form.Label>CostPrice</Form.Label>
                      <Form.Control type="text" name="CostPrice" onChange={handleInput}/>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                      <Form.Label>SellPrice</Form.Label>
                      <Form.Control type="text" name="SellPrice" onChange={handleInput}/>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control type="text" name="ProductQuantity" onChange={handleInput}/>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                      <Form.Label>Image</Form.Label>
                      <Form.Control type="file" name="ProductImage" onChange={handleInput}/>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <div className="AlertImage">
                    <h5>คำเตือน รูปภาพ</h5>
                      <ul>
                        <li>ต้องเป็นสกุลไฟล์ .jpg .jpeg .png เท่านั้น!!</li>
                        <li>ขนาดไฟล์ ไม่เกิน 2MB</li>
                      </ul>
                  </div>
                </Col>
            </Row>
            <hr/>
            <div className="customSubmit m-3 d-flex justify-content-end">
                <Button variant="danger" className="me-3" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" type="submit">ADD</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default InsertProduct