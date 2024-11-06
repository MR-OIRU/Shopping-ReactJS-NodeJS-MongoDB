import React ,{ useEffect, useState }from 'react'
import { Offcanvas, Row, Col } from 'react-bootstrap';
import { BsCart, BsTrash } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useQuantityInCart, useProductInCart, usePriceInCart, useCartUser } from '../../CartContext';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../../../assets/css/CartData.css'

function OffCanvasCart({ ...props }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const { CartUser } = useCartUser();
    const { setQuantityInCart } = useQuantityInCart();
    const { ProductInCart, setProductInCart} = useProductInCart();
    const { PriceTotalInCart, setPriceTotalInCart } = usePriceInCart();
    useEffect(() => {
      //------------------------ query Product in LocalStorage --------------------------
      if (CartUser) {
        const token = `cart_${CartUser}`;
        const userCart = JSON.parse(localStorage.getItem(token)) || null;
          if (userCart) {
            setProductInCart(userCart.cart);
            setPriceTotalInCart(userCart.TotalPriceInCart)
          }
      }
    }, [CartUser]);
    //------------------------ Delete Product in LocalStorage --------------------------
    const handleDelete = (productID) => {
      withReactContent(Swal).fire({
        text: "Do you want to delete this item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#198754",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete"
      }).then((result) => {
        if (result.isConfirmed) {
          const token = `cart_${CartUser}`;
          const userCart = JSON.parse(localStorage.getItem(token)) || { cart: [], wishlist: [] };
          const productToRemove = userCart.cart.find((data) => data.productID === productID);
            if(productToRemove){
              userCart.TotalPriceInCart -= parseInt(productToRemove.productPriceTotal, 10)
              userCart.TotalQuantityInCart -= productToRemove.productQuantity;
              userCart.cart = userCart.cart.filter((data) => data.productID !== productID);
              localStorage.setItem(token, JSON.stringify(userCart));
              setProductInCart(userCart.cart);
              setQuantityInCart(userCart.TotalQuantityInCart)
              setPriceTotalInCart(userCart.TotalPriceInCart)
              Swal.fire({
                title: "Cancel Success!",
                text: "Your Product has been cancelled.",
                icon: "success",
                confirmButtonColor: "#198754"
              })
            }
        }
      });
    }

  return (
      <>
      <div className="customIcon">
            <BsCart onClick={handleShow}/>
      </div>
        <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton className="cart-header">
          <Offcanvas.Title><h2 className='ms-5 pt-3'>Cart</h2></Offcanvas.Title>
        </Offcanvas.Header>
          <Offcanvas.Body className="cart-body">
          <hr/>
            <div className="cartDetail">
              {ProductInCart.length > 0 ? (
                  ProductInCart.map((item, index) => (
                    <Row key={index}>
                      <Col lg={12}>
                      <div className="cartProduct">
                        <div className="product_img">
                          <img src={`/public/image/product/${item.productImage}`} alt=''/>
                        </div>
                        <div className="product_Name">
                          <p>{item.productName}</p>
                        </div>
                      </div>
                      </Col>
                      <Col>
                        <div className="productPrice">
                          <p className="brand">{item.productBrand.charAt(0).toUpperCase() + item.productBrand.slice(1).toLowerCase()}</p>
                          <p className="quantity"> x {item.productQuantity}</p>
                          <p className="price"> ฿ {Number(item.productPriceTotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                          <button className="btn btn-sm btn-danger mb-3"onClick={ () => handleDelete(item.productID)}><BsTrash /></button>
                        </div>
                      </Col>
                  </Row>
                  ))
                ) : (
                  <span>No Have Product in Cart</span>
              )}
            </div>
            <hr/>
            <div className="PriceTotal">
                <p className="tx">Price Total</p>
                <p className="price">฿ {Number(PriceTotalInCart? PriceTotalInCart  : 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="cart_btn">
                <button className='btn btn-warning' onClick={ ()=> navigate('/cart')}>Cart</button>
                <button className='btn btn-warning' onClick={ ()=> navigate('/cart/checkout')}>CheckOut</button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
}

function Cart() {
  return (
    <>
    {['end'].map((placement, idx) => (
        <OffCanvasCart key={idx} placement={placement}/>
      ))}
    </>
  )
}

export default Cart
