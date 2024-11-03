import React from 'react'
import { Container, Row, Col, Form, FormSelect, Button } from 'react-bootstrap'
import { BsSearch } from "react-icons/bs";

function SelectProduct() {
  return (
    <>
    <Container>
        <div className="customSelect">
            <Row>
                <Col xs={7} md={8} lg={8}>
                    <FormSelect>
                        <option>All</option>
                        <option>Nike</option>
                        <option>converse</option>
                    </FormSelect>
                </Col>
                <Col xs={5} md={4} lg={4}>
                    <Form>
                        <div className="searchBox">
                            <Form.Control type="search" placeholder="Search"/>
                            <div className="searchBtn">
                                <Button variant="warning"><BsSearch /></Button>
                            </div>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    </Container>
    </>
  )
}

export default SelectProduct