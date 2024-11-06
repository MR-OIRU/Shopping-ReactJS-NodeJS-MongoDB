import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { BsTrash, BsEye } from "react-icons/bs";
import { Button, Row, Col, Container, Modal, Form, FormSelect } from 'react-bootstrap'
import axios from 'axios';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../../../assets/css/Admin/Order.css'

const Order = () => {
  const url = import.meta.env.VITE_API_URL
  axios.defaults.withCredentials = true
  const [order, setOrder] = useState([])
  const [orderID,setOrderID] = useState({})
  const [orderDetail, setOrderDetail] = useState({})
  const [modalDetail, setModalDetail] = useState({})

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [statusFilter, setStatusFilter] = useState("all");

   useEffect(()=>{
    axios.get(`${url}admin/order`).then((res)=>{
        const allOrders = res.data.orders; // Get all orders
        let filteredOrders;
        if (statusFilter === "all") {
          filteredOrders = allOrders; // Show all orders
        } else {
          filteredOrders = allOrders.filter(order => order.orderStatus === statusFilter);
        }
        setOrder(allOrders);
        setRecords(filteredOrders)
    }).catch((err) => console.log(err))
  },[statusFilter])

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value); // อัปเดตค่า statusFilter ตามที่ผู้ใช้เลือก
  };

const createColumn = (name, selector = null, sortable = true, cell = null, width = null) => ({
    name,
    selector,
    sortable,
    cell,
    width,
});

const columns = [
  createColumn('No.', (row, index) => index + 1, false, null, "80px"),
    createColumn('Status', row => (
      <span
        style={{
          color: row.orderStatus === "confirmed" ? "#00C200" : "#FF0000",
          fontWeight: "bold",
          fontSize: "15px"
        }}
      >
        {row.orderStatus}
      </span>
    ), true, null, "130px"),
    createColumn('ID', row => row.orderID, true, null, "200px"),
    createColumn('Name', row => row.orderName, true, null, "150px"),
    createColumn('Address', row => row.orderAddress, true, null, "400px"),
    createColumn('Price', row => new Number(row.orderPriceTotal).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}), true, null, "120px"),
    createColumn('Date', row => new Date(row.orderDate).toLocaleDateString('th-TH'), true, null, "120px"),
    createColumn('Action', null, false, row => (
        <div className="action-buttons">
            <Button variant="warning" onClick={() => handleShow(row.orderID)}><BsEye /></Button>
            <Button variant="danger" onClick={() => handleDelete(row.orderID)}><BsTrash /></Button>
        </div>
    ), "150px"),
];


  const [records, setRecords] = useState(order)

  const handleFilter = (e) =>{
    const value = e.target.value.toLowerCase();
    const newData = order.filter(row => {
        return (
            row.orderStatus?.toLowerCase().includes(value) ||
            row.orderID?.toLowerCase().includes(value) ||
            row.orderName?.toLowerCase().includes(value) ||
            row.orderAddress?.toLowerCase().includes(value) ||
            new Date(row.orderDate)?.toLocaleDateString('th-TH').toLowerCase().includes(value)
        )
    })
    setRecords(newData)
  }

  const handleShow = (orderID) => {
    setOrderID(orderID)
    setShow(true)
  };

  useEffect(()=>{
    if(show && orderID){
        axios.post(`${url}admin/order/edit`, {orderID}).then((res) => {
          setOrderDetail(res.data)
          setModalDetail(res.data)
        }).catch((err) => console.log(err))
    }
  },[show, orderID])

  const handleUpdate = (orderID) =>{
    withReactContent(Swal).fire({
        title: "Are you sure?",
        html: `Do you want to update.<br> The status of this order to Confirmed?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#198754",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axios.post(`${url}admin/order/update`, {orderID}).then((res) => {
                if(res.data.message === 'update successfully'){
                    Swal.fire({
                        title: "Update!",
                        icon: "success",
                        confirmButtonColor: "#198754",
                      }).then(()=>{
                        window.location.reload();
                    })
                }
            }).catch((err) => console.log(err))
        }
      });
  }

  const handleDelete = (orderID) =>{
    withReactContent(Swal).fire({
      title: "Are you sure?",
      html: `Do you want to delete the order with ID <span style="font-size: 1.20em; font-weight: bold;">${orderID}</span>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
          axios.post(`${url}admin/order/delete`, {orderID}).then((res) => {
              if(res.data.message === 'Delete successfully'){
                Swal.fire({
                  title: "Delete!",
                  icon: "success",
                  confirmButtonColor: "#198754",
                }).then(()=>{
                  window.location.reload();
              })
              }
          }).catch((err) => {
            if(err.response.data.message === 'Cannot Delete'){

            }
          })
      }
    });
  }

  return (
      <>
          <div className="customOrderData">
              <Container>
                  <Row>
                      <Col>
                      <h1>Order</h1>
                          <div className="customTable">
                                <div className="customInput">
                                    <div className='FilterStatus'>
                                      <h5 className='label'>Filter by Status</h5>
                                      <select onChange={handleStatusChange} value={statusFilter}>
                                        <option value="all">All</option>
                                        <option value="not confirmed">not Confirmed</option>
                                        <option value="confirmed">Confirmed</option>
                                      </select>
                                    </div>
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
              backdrop="static"
              keyboard={false}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              dialogClassName='customModalOrder'
          >
              <Modal.Header closeButton>
              <Modal.Title> Order : {modalDetail.orderID} | Status : <span className={orderDetail.orderStatus === 'not confirmed' ? "StatusNotConfirmation" : "StatusConfirmation"}>{orderDetail.orderStatus}</span></Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <h5 className='text-center mt-4'>Name : {orderDetail.orderName}</h5>
              <hr/>
                Date : {new Date(modalDetail.orderDate).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}<br/>
                Address : {orderDetail.orderAddress}
                <h5 className='text-center mt-4'>Product</h5>
                <hr/>
                {orderDetail.orderProduct && orderDetail.orderProduct.length > 0 ? (
                    orderDetail.orderProduct.map((item, index) => (
                        <div className="customOrderDetail" key={index}>
                            <div className="DetailImage">
                                <img src={`/public/image/product/${item.productImage}`} alt='' />
                                <p>{item.productName}</p>
                            </div>
                            <div className="Detail">
                            <p className="brand">{item.productBrand}</p>
                            <p className="quantity"> x {item.productQuantity}</p>
                            <p className="price"> Price : {Number(item.productPrice * item.productQuantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available</p> // Optionally, display a message when there's no data
                )}
                 <hr/>
                <h5>PriceTotal : {Number(orderDetail.orderPriceTotal).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} ฿</h5>
              </Modal.Body>
              <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                  Close
              </Button>
              <Button variant="success" onClick={() => handleUpdate(orderDetail.orderID)}>
                  Update
              </Button>
              </Modal.Footer>
          </Modal>
      </>
  )
}

export default Order