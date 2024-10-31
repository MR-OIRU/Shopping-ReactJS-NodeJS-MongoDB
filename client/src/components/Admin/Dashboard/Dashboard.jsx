import React, { useEffect, useState } from 'react'

import { Col, Container, Row } from 'react-bootstrap'

import axios from 'axios'

import '../../../assets/css/Admin/Dashboard.css'

const Dashboard = () => {
  return (
    <>
        <div className="customDashboard">
            <Container>
                <div className="customDataMember">
                    <Row>
                      <Col xs={12} sm={4} md={4} lg={4} xl={4} xxl={4} className='customCol'>
                            <div className="HeadMember">
                                <h5> Member </h5>
                            </div>
                            <div className="Member mt-3">
                                <h1>0 คน</h1>
                            </div>
                      </Col>
                      <Col xs={12} sm={4} md={4} lg={4} xl={4} xxl={4} className='customCol'>
                          <div className="HeadAdmin">
                                <h5> Admin </h5>
                          </div>
                          <div className="Admin mt-3">
                                <h1>0 คน</h1>
                          </div>
                      </Col>
                      <Col xs={12} sm={4} md={4} lg={4} xl={4} xxl={4} className='customCol'>
                          <div className="HeadUser">
                                <h5> User </h5>
                          </div>
                          <div className="User mt-3">
                                <h1>0 คน</h1>
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