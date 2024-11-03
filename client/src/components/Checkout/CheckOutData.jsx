import React, { useEffect, useState } from 'react'
import { Container,Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'; 
import { useProductInCart , usePriceInCart, useCartUser, useUsername} from '../CartContext';
import { BsGoogle, BsCreditCard, BsWallet2 } from "react-icons/bs";

import ValidationCheckOut from '../../assets/js/ValidationCheckOut';

import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function CheckOutData() {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate()

  const { CartUser } = useCartUser();
  const { Username } = useUsername();
  const { PriceTotalInCart, setPriceTotalInCart } = usePriceInCart();
  const { ProductInCart, setProductInCart} = useProductInCart()
  const [ values , setValues] = useState({
    FirstName:"",
    LastName:"",
    Email:"",
    StreetAddress:"",
    Province:"",
    ZIP:"",
    Phone:"",
    Additional:""
  })
  const [errors, setErrors] = useState({})
  const handleInput = (e) =>{
    setValues(prev => ({
      ...prev, 
      [e.target.name]: e.target.value
    }));
  }
 
  useEffect(()=>{
    if(CartUser){
        const token = `cart_${CartUser}`
        const userCart = JSON.parse(localStorage.getItem(token)) || null
        if(userCart){
          setProductInCart(userCart.cart);
          setPriceTotalInCart(userCart.TotalPriceInCart)
      }
    }
  },[CartUser])

  useEffect(()=>{
    setErrors(ValidationCheckOut(values));
  },[values])

  const isButtonDisabled = () =>{
    return Object.values(errors).some(error => error !== "Info submitted");
  }
  const handlePlaceOrder = (e) =>{
        e.preventDefault();
        const token = `cart_${CartUser}`
        const userCart = JSON.parse(localStorage.getItem(token)) || null
        const Tax = userCart.TotalPriceInCart + (userCart.TotalPriceInCart * 0.07)
        const data = {
            Cart : userCart.cart,
            TotalPrice : Tax
        }
        axios.post(`${url}checkout`,{values,data,Username}).then((res)=>{
          if(res.data.message === "Order successfully"){
            for (let i = localStorage.length - 1; i >= 0; i--) {
              const key = localStorage.key(i);
              const token = `cart_${CartUser}`
              if (key.startsWith(token)) {
                withReactContent(Swal).fire({
                  icon: "success",
                  title: "Successfully",
                  text:"Order successfully!!.",
                  timer: 1500,
                  showConfirmButton: false
                }).then(()=>{
                  localStorage.removeItem(key);
                  navigate('/')
                })
              }
            }
          }
        }).catch((err) => {
          if (err.response) {
            if (err.response.data.message === 'Order failed') {
              withReactContent(Swal).fire({
                icon: "error",
                title: "Order failed",
                showConfirmButton: false,
                timer: 3000
              }).then(() => document.querySelector('.customModal').focus());
            }
          } else {
            console.log('Error:', err.message);
          }
        })
  }
        return (
          <>
            <Container>
              <div className="customData">
                <Row>
                  <Col xl={5}>
                  <h3 className="mb-3">Billing Details</h3>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name <span className='text-danger'>*</span></Form.Label>
                        <Form.Control type="text" name="FirstName" onChange={handleInput}
                        className={`${errors.FirstName === '' ? 'default' : errors.FirstName === 'Info submitted' ? 'Text' : 'errText'}`}/>
                        <p className='text-error mt-3 text-center'>{errors.FirstName === '' || errors.FirstName === 'Info submitted' ? '' : errors.FirstName}</p>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name <span className='text-danger'>*</span></Form.Label>
                        <Form.Control type="text" name="LastName" onChange={handleInput}
                        className={`${errors.LastName === '' ? 'default' : errors.LastName === 'Info submitted' ? 'Text' : 'errText'}`}/>
                        <p className='text-error mt-3 text-center'>{errors.LastName === '' || errors.LastName === 'Info submitted' ? '' : errors.LastName}</p>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Email <span className='text-danger'>*</span></Form.Label>
                        <Form.Control type="text" name="Email" onChange={handleInput}
                        className={`${errors.Email === '' ? 'default' : errors.Email === 'Info submitted' ? 'Text' : 'errText'}`}/>
                        <p className='text-error mt-3 text-center'>{errors.Email === '' || errors.Email === 'Info submitted' ? '' : errors.Email}</p>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Street Address <span className='text-danger'>*</span></Form.Label>
                        <Form.Control type="text" name="StreetAddress" onChange={handleInput}
                        className={`${errors.StreetAddress === '' ? 'default' : errors.StreetAddress === 'Info submitted' ? 'Text' : 'errText'}`}/>
                        <p className='text-error mt-3 text-center'>{errors.StreetAddress === '' || errors.StreetAddress === 'Info submitted' ? '' : errors.StreetAddress}</p>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Province <span className='text-danger'>*</span></Form.Label>
                        <Form.Control type="text" name="Province" onChange={handleInput}
                        className={`${errors.Province === '' ? 'default' : errors.Province === 'Info submitted' ? 'Text' : 'errText'}`}/>
                        <p className='text-error mt-3 text-center'>{errors.Province === '' || errors.Province === 'Info submitted' ? '' : errors.Province}</p>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>ZIP <span className='text-danger'>*</span></Form.Label>
                        <Form.Control type="text" name="ZIP" onChange={handleInput} maxLength={5}
                        className={`${errors.ZIP === '' ? 'default' : errors.ZIP === 'Info submitted' ? 'Text' : 'errText'}`}/>
                        <p className='text-error mt-3 text-center'>{errors.ZIP === '' || errors.ZIP === 'Info submitted' ? '' : errors.ZIP}</p>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone <span className='text-danger'>*</span></Form.Label>
                        <Form.Control type="text" name="Phone" onChange={handleInput}
                         placeholder='000-0000-000' maxLength={10}
                         className={`${errors.Phone === '' ? 'default' : errors.Phone === 'Info submitted' ? 'Text' : 'errText'}`}/>
                        <p className='text-error mt-3 text-center'>{errors.Phone === '' || errors.Phone === 'Info submitted' ? '' : errors.Phone}</p>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label><h3>Additional Information</h3></Form.Label>
                        <Form.Control as="textarea" rows={3} name="Additional" onChange={handleInput}/>
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col xl={7}>
                    <div className="customDetailOrder">
                      <h3 className="mb-3">Your Order</h3>
                      <div className="yourOrder">
                        <ul className="showAllProductPrice">
                          {ProductInCart.map((item,index)=> (
                            <li key={index}>
                              <p className="productName">{item.productBrand.charAt(0).toUpperCase() + item.productBrand.slice(1).toLowerCase()} {item.productName}
                              <span className="qty"> x {item.productQuantity} </span></p>
                              <p className="price">{Number(item.productPriceTotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿</p>
                            </li>
                          ))}
                        </ul>
                        <ul className="showTotal">
                            <li><span>Price Total</span> <span className="priceTotal">{Number(PriceTotalInCart? PriceTotalInCart  : 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿</span></li>
                            <li><span>Tax</span><span>7%</span></li>
                            <li><span>Total</span><span className="total">{Number(PriceTotalInCart? PriceTotalInCart + (PriceTotalInCart * 0.07) : 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿</span></li>
                        </ul>
                      </div>
      
                      <div className="paymentMethod">
                          <h3 className="mb-3">Payment Method</h3>
                          <div className="payment">
                            <div className="paymentBx">
                              <div className="cardTx"><span><BsCreditCard className="icon"/> Credit Card</span> <span>
                                <input type="radio" id="credit" name="chooseCredit" value="creditCard" /></span>
                              </div>
                              <p className="detail">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius, error rerum accusamus commodi quidem delectus harum quia ipsum laborum excepturi aliquid repellendus enim repudiandae perspiciatis, illo tempore illum nemo odio.</p>
                              <div className="cardTx"><span><BsGoogle className="icon"/> Google Pay</span><span> 
                                <input type="radio" id="googlePay" name="chooseCredit"/></span>
                                </div>
                              <div className="cardTx"><span><BsWallet2 className="icon" /> Cash on Delivery</span><span> 
                                <input type="radio" id="cashOnDelivery" name="chooseCredit"/></span>
                                </div>
                            </div>
                          </div>
                        </div>
          
                        <div className="alertDetail mb-5">
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto nisi accusamus explicabo quia officiis voluptates quisquam, obcaecati voluptatum odio, ratione repellendus saepe necessitatibus possimus deserunt asperiores earum hic id provident? Tenetur incidunt aperiam distinctio repellat ab? Voluptatibus adipisci sapiente libero?</p>
                        </div>
                        <div className="submitPayment">
                          <Button variant='warning' disabled={isButtonDisabled()} onClick={handlePlaceOrder}>Place Order</Button>
                        </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </>
        )
}

export default CheckOutData