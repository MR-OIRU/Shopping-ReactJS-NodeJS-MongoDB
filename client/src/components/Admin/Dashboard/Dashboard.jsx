import React, { useEffect, useState } from 'react'

import { Col, Container, Row } from 'react-bootstrap'

import axios from 'axios'

import '../../../assets/css/Admin/Dashboard.css'

const Dashboard = () => {
    const url = import.meta.env.VITE_API_URL

    const [countMember, setCountMember] = useState("")
    const [countMemberUser, setCountMemberUser] = useState("")
    const [countMemberAdmin, setCountMemberAdmin] = useState("")

    const [countOrder, setCountOrder] = useState("")
    const [countConfirmed, setCountConfirmed] = useState("")
    const [countNotConfirmed, setCountNotConfirmed] = useState("")

    const [countProduct, setCountProduct] = useState("")

    const [countOrderPrice, setCountOrderPrice] = useState("")
    useEffect(()=>{
        axios.get(`${url}admin`).then((res)=>{
            setCountMember(res.data.total_members)
            setCountMemberUser(res.data.Member)
            setCountMemberAdmin(res.data.Admin)

            setCountOrder(res.data.total_orders)
            setCountConfirmed(res.data.Confirmed)
            setCountNotConfirmed(res.data.NotConfirmed)

            setCountProduct(res.data.total_products)
            setCountOrderPrice(res.data.total_orderPrice)
        }).catch((err)=> console.log(err))
    },[])
  return (
    <>
        <div className="customDashboard">
            <Container fluid="lg">
                <div className="customDataMember">
                    <Row>
                      <Col xs={12} sm={4} md={4} lg={4} xl={4} xxl={4} className='customCol'>
                            <div className="HeadMember">
                                <h5> Member </h5>
                            </div>
                            <div className="Member mt-3">
                                <h1>{countMember} คน</h1>
                            </div>
                      </Col>
                      <Col xs={12} sm={4} md={4} lg={4} xl={4} xxl={4} className='customCol'>
                          <div className="HeadAdmin">
                                <h5> Admin </h5>
                          </div>
                          <div className="Admin mt-3">
                                <h1>{countMemberAdmin} คน</h1>
                          </div>
                      </Col>
                      <Col xs={12} sm={4} md={4} lg={4} xl={4} xxl={4} className='customCol'>
                          <div className="HeadUser">
                                <h5> User </h5>
                          </div>
                          <div className="User mt-3">
                                <h1>{countMemberUser} คน</h1>
                          </div>
                      </Col>
                    </Row>  
                </div>
                <div className="customDataOrder">
                    <Row>
                      <Col sm={12} md={7} lg={7} xl={7} className="ColOrder">
                            <div className="HeadOrder">
                                <h5> Order Total </h5>
                            </div>
                            <div className="Order mt-3">
                                <h2>{countOrder} Order</h2>
                            </div>
                            <Row className='ColOrder mt-5' >
                                <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <div className="HeadConfirmed">
                                        <h5> Confirmed </h5>
                                    </div>
                                    <div className="Confirmed mt-3">
                                        <h3>{countConfirmed} Order</h3>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <div className="HeadNotConfirmed">
                                        <h5> Not Confirmed </h5>
                                    </div>
                                    <div className="NotConfirmed mt-3">
                                        <h3>{countNotConfirmed} Order</h3>
                                    </div>
                                </Col>
                            </Row>
                      </Col>
                      <Col sm={12} md={5} lg={5} xl={5} className='ColSales'>
                            <div className="HeadSales">
                                <h5> Sales </h5>
                            </div>
                            <div className="Sales mt-3">
                                <h1>{new Number(countOrderPrice).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} บาท</h1>
                            </div>
                      </Col>
                    </Row>  
                </div>
                <div className="customDataSales">
                    <Row>
                      <Col xs={12} sm={6} md={6} lg={6} xl={6} className="ColProfit">
                            <div className="HeadProfit">
                                <h5> Profit </h5>
                            </div>
                            <div className="Profit mt-3">
                                <h2>{countOrder} ฿</h2>
                            </div>
                      </Col>
                      <Col xs={12} sm={6} md={6} lg={6} xl={6} className='ColInventories'>
                            <div className="HeadInventories">
                                <h5> Inventories </h5>
                            </div>
                            <div className="Inventories mt-3">
                                <h1>{countProduct} ชิ้น</h1>
                            </div>
                      </Col>
                    </Row>  
                </div>
            </Container>
        </div>
    </>
  )
}

export default Dashboard