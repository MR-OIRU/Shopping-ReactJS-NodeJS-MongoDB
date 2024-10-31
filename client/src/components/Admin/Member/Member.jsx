import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Button, Row, Col, Container, Modal, Form } from 'react-bootstrap'

import InsertMember from './InsertMember';

import axios from 'axios'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../../../assets/css/Admin/Member.css'

const Member = () => {
    const url = import.meta.env.VITE_API_URL
    axios.defaults.withCredentials = true
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [member, setMember] = useState([])
    const [user, setUser] = useState(null)
    const [edit, setEdit] = useState({})
    const [modelMember, setModelMember] = useState({})

     // Query All Member
     useEffect(()=>{
        axios.get(`${url}admin/member`).then((res)=>{
            setMember(res.data)
            setRecords(res.data)
        }).catch((err) => console.log(err))
    },[])


    const createColumn = (name, selector = null, sortable = true, cell = null) => ({
        name,
        selector,
        sortable,
        cell,
    });

    const columns = [
        createColumn('No.', (row, index) => index + 1),
        createColumn('Role', row => row.Role),
        createColumn('Username', row => row.Username),
        createColumn('Email', row => row.Email),
        createColumn('First Name', row => row.FirstName),
        createColumn('Last Name', row => row.LastName),
        createColumn('Sex', row => row.Sex),
        createColumn('Phone', row => row.Phone),
        createColumn('Date', row => new Date(row.Date).toLocaleDateString('th-TH')),
        createColumn('Action', null, true, row => (
            <div className="action-buttons">
                <Button variant="warning" onClick={() => handleEdit(row.Username)}><BsPencilSquare /></Button>
                <Button variant="danger" onClick={() => handleDelete(row.Username)}><BsTrash /></Button>
            </div>
        )),
    ];
    
    const [records, setRecords] = useState(member)

    const handleFilter = (e) =>{
        const value = e.target.value.toLowerCase();
        const newData = member.filter(row => {
            return (
                row.Role?.toLowerCase().includes(value) ||
                row.Username?.toLowerCase().includes(value) ||
                row.Email?.toLowerCase().includes(value) ||
                row.FirstName?.toLowerCase().includes(value) ||
                row.LastName?.toLowerCase().includes(value) ||
                row.Sex?.toLowerCase().includes(value) ||
                row.Phone?.toLowerCase().includes(value) ||
                new Date(row.Date)?.toLocaleDateString('th-TH').toLowerCase().includes(value)
            )
        })
        setRecords(newData)
      }

    // EDIT MEMBER
    const handleEdit = (Username) => {
        setUser(Username)
        setShow(true);
    };

    useEffect(()=>{
        if(show && user){
            axios.post(`${url}admin/member/edit`, { user }).then((res)=>{
                setEdit(res.data)
                setModelMember(res.data)
            }).catch((err) => {
                console.log(err.message)
            })
        }
    },[show,user])

    const handleChange = (e) =>{
        const { name , value } = e.target
        setEdit(prev => ({
          ...prev,[name]: value
        }))
      }

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post(`${url}admin/member/update`, 
            {   OldEmail : modelMember.Email,
                newData : edit 
            } ).then((res)=>{
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
            }
        })
    }

    // Delete Member
    const handleDelete = (Username) => {
        withReactContent(Swal).fire({
            title: "Are you sure?",
            html: `Do you want to delete <br> the data of <span style="font-size: 1.25em; font-weight: bold;">${Username}</span> ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#04AA6D",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`${url}admin/member/delete`, {Username}).then((res)=>{
                    if(res.data.message === 'Delete Member Success!!'){
                        Swal.fire({
                            title: "Deleted!",
                            html: `The data of <span style="font-size: 1.25em; font-weight: bold;">${Username}</span> has been deleted.`,
                            icon: "success",
                            confirmButtonColor: "#d33"
                          }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                          });
                    }
                }).catch((err)=>{
                    if(err.response.data.message === 'Delete Member Error!!'){
                        withReactContent(Swal).fire({
                            icon: "error",
                            title: "Delete failed",
                            html: `Delete Member By <span style="font-size: 1.25em; font-weight: bold;">${Username}</span> Error!!`,
                            showConfirmButton: false,
                            timer: 3000
                          }).then(() => document.querySelector('.customModal').focus());
                    }else if(err.response.data.message === 'You cannot delete this username.!!'){
                        withReactContent(Swal).fire({
                            icon: "error",
                            title: "Delete failed",
                            html: `You cannot delete this <span style="font-size: 1.25em; font-weight: bold;">${Username}</span> !!`,
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
            <div className="customMember">
                <Container>
                    <Row>
                        <Col>
                        <h1>Member</h1>
                            <div className="customTable">
                                <div className="customInput">
                                    <InsertMember/>
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
              <Modal.Title>Member : {modelMember.FirstName} {modelMember.LastName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select  name="Role" 
                                    value={edit.Role || ''}
                                    onChange={handleChange}>
                                    <option value="" disabled>Select Role</option>
                                    <option value="Administrator">Administrator</option>
                                    <option value="User">User</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="Username" 
                                    value={edit.Username || ''} disabled/>
                            </Form.Group>
                        </Col>
                        <Col lg={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="Email" 
                                    value={edit.Email || ''} onChange={handleChange}
                                />
                                <Form.Control type="email" name="OldEmail" 
                                    value={modelMember.Email || ''} disabled hidden
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="FirstName" 
                                    value={edit.FirstName || ''} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="LastName" 
                                    value={edit.LastName || ''} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Sex</Form.Label>
                                <Form.Select  name="Sex" 
                                    value={edit.Sex || ''}
                                    onChange={handleChange}>
                                    <option value="" disabled>Select Sex</option>  // แสดง option แรกเป็น disabled
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="Phone" 
                                    value={edit.Phone || ''} onChange={handleChange}
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
export default Member