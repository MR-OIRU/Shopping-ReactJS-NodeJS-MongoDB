import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Button, Row, Col, Container, Modal, Form } from 'react-bootstrap'

import InsertBrand from './InsertBrand';

import axios from 'axios'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../../../assets/css/Admin/Brand.css'

const Brand = () => {
  const url = import.meta.env.VITE_API_URL
  axios.defaults.withCredentials = true
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [brand, setBrand] = useState([])
  const [brandID, setBrandID] = useState(null)
  const [edit, setEdit] = useState({})
  const [modelBrand, setModelBrand] = useState({})

   // Query All Member
   useEffect(()=>{
      axios.get(`${url}admin/brand`).then((res)=>{
          setBrand(res.data)
          setRecords(res.data)
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
      createColumn('ID', row => row.BrandID),
      createColumn('Name', row => row.BrandName),
      createColumn('Date', row => new Date(row.Date).toLocaleDateString('th-TH')),
      createColumn('Action', null, true, row => (
          <div className="action-buttons">
              <Button variant="warning" onClick={() => handleEdit(row.BrandID)}><BsPencilSquare /></Button>
              <Button variant="danger" onClick={() => handleDelete(row.BrandID)}><BsTrash /></Button>
          </div>
      )),
  ];
  
  const [records, setRecords] = useState(brand)

  const handleFilter = (e) =>{
      const value = e.target.value.toLowerCase();
      const newData = brand.filter(row => {
          return (
              row.BrandID?.toLowerCase().includes(value) ||
              row.BrandName?.toLowerCase().includes(value) ||
              new Date(row.Date)?.toLocaleDateString('th-TH').toLowerCase().includes(value)
          )
      })
      setRecords(newData)
    }

  // EDIT MEMBER
  const handleEdit = (BrandID) => {
      setBrandID(BrandID)
      setShow(true);
  };

  useEffect(()=>{
      if(show && brandID){
          axios.post(`${url}admin/brand/edit`, { brandID }).then((res)=>{
              setEdit(res.data)
              setModelBrand(res.data)
          }).catch((err) => {
              console.log(err.message)
          })
      }
  },[show,brandID])

  const handleChange = (e) =>{
      const { name , value } = e.target
      setEdit(prev => ({
        ...prev,[name]: value
      }))
    }

  const handleSubmit = (e) =>{
      e.preventDefault()
      axios.post(`${url}admin/brand/update`, 
          {   OldBrandName : modelBrand.BrandName,
              newData : edit 
          } ).then((res)=>{
              if(res.data.message === 'Update Brand success!!'){
                  withReactContent(Swal).fire({
                      icon: "success",
                      title: "Update Successfully!!",
                      confirmButtonColor: "#04AA6D",
                    }).then((result) => {
                        document.querySelector('.customModal').focus()
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
              }
      }).catch((err) => {
          if(err.response.data.message === 'This Brand is already in use!!'){
              withReactContent(Swal).fire({
                  icon: "error",
                  title: "Update failed",
                  html: `This Brand is already in use <br>Please enter another brand`,
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
    <div className="customBrand">
                <Container>
                    <Row>
                        <Col>
                        <h1>Brand</h1>
                            <div className="customTable">
                                <div className="customInput">
                                    <InsertBrand/>
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
              <Modal.Title>Brand : {modelBrand.BrandName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                    <Col md={12} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Brand ID</Form.Label>
                                <Form.Control type="text" name="BrandID" 
                                    value={edit.BrandID || ''} disabled
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control type="text" name="BrandName" 
                                    value={edit.BrandName || ''} onChange={handleChange}
                                />
                                <Form.Control type="text" name="OldBrandName" 
                                    value={modelBrand.BrandName || ''} disabled hidden
                                />
                            </Form.Group>
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

export default Brand