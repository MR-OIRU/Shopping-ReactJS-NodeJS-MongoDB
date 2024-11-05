import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

import axios from 'axios'
import '../../assets/css/Member/OrderData.css'

const OrderData = () => {
    const [order,setOrder] = useState([ ])
    const url = import.meta.env.VITE_API_URL

    useEffect(()=>{
        axios.post(`${url}member/order`).then((res) =>{
            setOrder(res.data.orders)
        }).catch((err)=> console.log(err))
    },[])
  return (
    <>
        <section className='customOrder'>
            <Container>
                <div className="customOrderDetail">
                    <div className="customRow">
                        {order.map((item,index) => (
                            <Row key={index}>
                                <Col className='mb-5'>
                                <Card>
                                    <Card.Body>
                                        <Card.Title className='Order'>
                                            Order : {item.orderID}
                                        </Card.Title>
                                        <Card.Text className='Address'>
                                            Address : {item.orderAddress}
                                        </Card.Text>
                                        <Card.Text className='Detail'>
                                        {item.orderProduct.map((product, productIndex) => (
                                            <div className="orderDetail" key={productIndex}>
                                                <img src={`/public/image/product/${product.productImage}`} alt="" />
                                                {product.productBrand} {product.productName} x {product.productQuantity} <br/>
                                                [ Price : {Number(product.productPrice*product.productQuantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿ ]
                                            </div>
                                        ))}
                                        </Card.Text>
                                        <Card.Text className="customTotal">
                                                Price Total : {Number(item.orderPriceTotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿
                                                <br/><br/>
                                                Status :  
                                                <span className={item.orderStatus === 'confirmed' ? 'StatusConfirmed' : 'StatusNotConfirmed'}>
                                                    {item.orderStatus}
                                                </span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                </Col>
                            </Row>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    </>
  )
}

export default OrderData