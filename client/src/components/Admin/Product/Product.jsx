import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Button, Row, Col, Container, Modal, Form } from 'react-bootstrap'

import InsertProduct from './insertProduct';

import axios from 'axios'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../../../assets/css/Admin/Product.css'

const Product = () => {
  const url = import.meta.env.VITE_API_URL
  axios.defaults.withCredentials = true
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [product, setProduct] = useState([])
  const [records, setRecords] = useState(product)

  const [productID, setProductID] = useState(null)
  const [edit, setEdit] = useState({})
  const [brands, setBrands] = useState([]); 
  const [modalProduct, setModalProduct] = useState({})
   // Query All Member
   useEffect(()=>{
      axios.get(`${url}admin/product`).then((res)=>{
        const products = res.data.Product.map(product => {
            return {
                ...product,
                Brand: product.brand.length > 0 ? product.brand[0].BrandName : 'Unknown',
            };
        });
        setProduct(products);
        setRecords(products);
      }).catch((err) => console.log(err))
  },[])


  const createColumn = (name, selector = null, sortable = true, cell = null) => ({
      name,
      selector,
      sortable,
      cell
  });

  const columns = [
      createColumn('No.', (row, index) => index + 1),
      createColumn('Image', null, true, row => (
            <div className="image">
                <img src={`/image/product/${row.ProductImage}`} alt=''/>
            </div>
        )),
      createColumn('ID', row => row.ProductID),
      createColumn('Brand', row => row.Brand),
      createColumn('Name', row => row.ProductName),
      createColumn('Quantity', row => new Number(row.ProductQuantity).toLocaleString()+ ' ชิ้น'),
      createColumn('CostPrice', row => new Number(row.CostPrice).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})),
      createColumn('SellPrice', row => new Number(row.SellPrice).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})),
      createColumn('Sold', row => new Number(row.ProductSold).toLocaleString()+ ' ชิ้น'),
      createColumn('Date', row => new Date(row.ProductDate).toLocaleDateString('th-TH')),
      createColumn('Action', null, true, row => (
          <div className="action-buttons">
              <Button variant="warning" onClick={() => handleEdit(row.ProductID)}><BsPencilSquare /></Button>
              <Button variant="danger" onClick={() => handleDelete(row.ProductID)} disabled><BsTrash /></Button>
          </div>
      ))
  ];
  

  const handleFilter = (e) =>{
      const value = e.target.value.toLowerCase();
      const newData = product.filter(row => {
          return (
              row.ProductID?.toLowerCase().includes(value) ||
              row.ProductName?.toLowerCase().includes(value) ||
              new Date(row.Date)?.toLocaleDateString('th-TH').toLowerCase().includes(value)
          )
      })
      setRecords(newData)
    }

  // EDIT MEMBER
  const handleEdit = (ProductID) => {
      setProductID(ProductID)
      setShow(true);
  };

  useEffect(()=>{
      if(show && productID){
          axios.post(`${url}admin/product/edit`, { productID }).then((res)=>{
                setBrands(res.data.Brand);
                setEdit(res.data.Product);
                setModalProduct(res.data.Product);
          }).catch((err) => {
              console.log(err.message)
          })
      }
  },[show,productID])

  const handleChange = (e) =>{
    const { name, type, files, value } = e.target;
        if (type === 'file') {
          setEdit(prev => ({
            ...prev, [name]: files[0]
          }));
        } else {
            setEdit(prev => ({
            ...prev, [name]: value
          }));
        }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const OldImage = modalProduct.ProductImage
    const formData = new FormData();

    for (const key in edit) {
        formData.append(key, edit[key]);
    }
    formData.append("OldImage", OldImage);

    axios.post(`${url}admin/product/update`, formData ).then((res) => {
        if(res.data.message === 'Update Product success!!'){
            withReactContent(Swal).fire({
                icon: "success",
                title: "Successfully!!",
                text: "Update Product success!!",
                confirmButtonColor: "#04AA6D",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
          }
    }).catch((err) => {
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
                text: "Only images are allowed ( .jpeg .jpg .png ) !!",
                showConfirmButton: false,
                timer: 2000
              }).then(() => document.querySelector('.customModal').focus());
            }else{
              withReactContent(Swal).fire({
                icon: "error",
                title: "Error!!",
                text: "Update Product Failed!!",
                showConfirmButton: false,
                timer: 2000
              }).then(() => document.querySelector('.customModal').focus());
            }
          } else {
            console.log('Error:', err.message);
          }
    })
  }

  // Delete Member
  const handleDelete = (BrandID) => {
      withReactContent(Swal).fire({
          title: "Are you sure?",
          html: `Do you want to delete <br> the Data of <span style="font-size: 1.25em; font-weight: bold;">${BrandID}</span> ?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#04AA6D",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
              axios.post(`${url}admin/brand/delete`, {BrandID}).then((res)=>{
                  if(res.data.message === 'Delete Brand Success!!'){
                      Swal.fire({
                          title: "Deleted!",
                          html: `The Data of <span style="font-size: 1.25em; font-weight: bold;">${BrandID}</span> <br>has been deleted.`,
                          icon: "success",
                          confirmButtonColor: "#d33"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                  }
              }).catch((err)=>{
                  if(err.response.data.message === 'Delete Brand Error!!'){
                      withReactContent(Swal).fire({
                          icon: "error",
                          title: "Delete failed",
                          html: `Delete Data By <span style="font-size: 1.25em; font-weight: bold;">${BrandID}</span> Error!!`,
                          showConfirmButton: false,
                          timer: 3000
                        }).then(() => document.querySelector('.customModal').focus());
                  }
              })
          }
        });
  };
  return (
    <>
        <div className="customProduct">
            <Container>
                <Row>
                    <Col>
                    <h1>Product</h1>
                        <div className="customTable">
                            <div className="customInput">
                                <InsertProduct/>
                                <input type='text' className="form" placeholder="Search..." onChange={handleFilter}/>
                            </div>
                            <DataTable
                                columns={columns}
                                data={records}
                                pagination
                                paginationPerPage={15}
                                paginationRowsPerPageOptions={[15, 25, 50, 100 , 150, 200]}
                                noDataComponent={
                                    <div className="no-data-message">
                                        There are no Data to display
                                    </div>
                                }
                                className="customData"
                                responsive
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    
            <Modal 
                show={show} 
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName='customModal'                    
            >
            <Modal.Header closeButton>
                <Modal.Title className='ms-auto text-center'>
                    Product
                    <hr/>
                    {modalProduct.ProductName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" name="ProductID" value={productID} disabled/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Brand</Form.Label>
                                <Form.Select name="ProductBrand"  value={edit.ProductBrand || ''} onChange={handleChange}>
                                <option value="" disabled>Select Sex</option>
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
                                <Form.Control type="text" name="ProductName" value={edit.ProductName || ''} onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>CostPrice</Form.Label>
                                <Form.Control type="text" name="CostPrice" value={edit.CostPrice || ''} onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>SellPrice</Form.Label>
                                <Form.Control type="text" name="SellPrice"  value={edit.SellPrice || ''} onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="text" name="ProductQuantity" value={edit.ProductQuantity || ''} onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" name="ProductImage" onChange={handleChange}/>
                                <Form.Control type="hidden" name="OldImage"  value={modalProduct.ProductImage || ''}/>
                            </Form.Group>
                        </Col>
                        <Col md={12} className="image">
                            <img src={`/image/product/${modalProduct.ProductImage}`} alt="" />
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
                    <div className="customSubmit">
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success"type="submit">Update</Button>
                    </div>
                </Form>
            </Modal.Body>
          </Modal>
    </>
  )
}

export default Product