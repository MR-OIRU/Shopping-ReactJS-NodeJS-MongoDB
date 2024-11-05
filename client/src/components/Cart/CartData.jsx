import React, { useEffect } from 'react'
import { Button, Container, Row, Col, Table  } from 'react-bootstrap'
import { BsTrash } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useProductInCart , useQuantityInCart , usePriceInCart, useCartUser} from '../CartContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const CartData = () => {
    const navigate = useNavigate();

    const { CartUser } = useCartUser();
    const { setQuantityInCart } = useQuantityInCart();
    const { PriceTotalInCart, setPriceTotalInCart } = usePriceInCart();
    const { ProductInCart, setProductInCart} = useProductInCart()

    useEffect(()=>{
        if(CartUser){
            const token = `cart_${CartUser}`
            const userCart = JSON.parse(localStorage.getItem(token)) || null
            if(userCart){
                setProductInCart(userCart.cart);
            }
        }
    },[CartUser])
    // Plus Quantity
    const handlePlus = (productID) =>{
        const token = `cart_${CartUser}`
        const userCart = JSON.parse(localStorage.getItem(token)) || null
        const QuantityPlus = userCart.cart.find((data) => data.productID === productID);
        if(QuantityPlus){
                QuantityPlus.productQuantity += 1
                userCart.TotalQuantityInCart += 1
                userCart.TotalPriceInCart += parseInt(QuantityPlus.productPrice, 10)
                QuantityPlus.productPriceTotal = parseInt(QuantityPlus.productPrice, 10) * QuantityPlus.productQuantity
                localStorage.setItem(token, JSON.stringify(userCart));
                setProductInCart(userCart.cart);
                setQuantityInCart(userCart.TotalQuantityInCart);
                setPriceTotalInCart(userCart.TotalPriceInCart);
        }
    }
    // Minus Quantity
    const handleMinus = (productID) =>{
        const token = `cart_${CartUser}`
        const userCart = JSON.parse(localStorage.getItem(token)) || null
        const QuantityPlus = userCart.cart.find((data) => data.productID === productID);
        if(QuantityPlus){
            if(QuantityPlus.productQuantity === 1 ){
                withReactContent(Swal).fire({
                    position: "center",
                    icon: "warning",
                    title: "Warning",
                    text: "Your product quantity is at the minimum!",
                    showConfirmButton: false,
                    timer: 1500
                    })
            }else{
            QuantityPlus.productQuantity -= 1
            userCart.TotalQuantityInCart -= 1
            userCart.TotalPriceInCart -= parseInt(QuantityPlus.productPrice, 10)
            QuantityPlus.productPriceTotal = parseInt(QuantityPlus.productPrice, 10) * QuantityPlus.productQuantity
            localStorage.setItem(token, JSON.stringify(userCart));
            setProductInCart(userCart.cart);
            setQuantityInCart(userCart.TotalQuantityInCart)
            setPriceTotalInCart(userCart.TotalPriceInCart);
            }
        }
    }
    // Delete Product
    const handleDelete = (productID) =>{
        withReactContent(Swal).fire({
            text: "Do you want to delete this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#198754",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
          }).then((result) => {
            if (result.isConfirmed) {
                const token = `cart_${CartUser}`
                const userCart = JSON.parse(localStorage.getItem(token)) || null
                const productToRemove = userCart.cart.find((data) => data.productID === productID)
                if(productToRemove){
                    userCart.TotalPriceInCart -= parseInt(productToRemove.productPriceTotal, 10)
                    userCart.TotalQuantityInCart -= productToRemove.productQuantity;
                    userCart.cart = userCart.cart.filter((data) => data.productID !== productID)
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
          })
    }

    const handelCheckOut = () =>{
            navigate('/cart/checkout')
    }
return (
    <>
        <Container>
            <div className="customCartData">
                <Row>
                    <Col xl={9}>
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                            <th>Order</th>
                            <th>Image</th>
                            <th>
                                <div className="Name">Name</div>
                            </th>
                            <th>Price</th>
                            <th>
                                <div className="Quantity">Quantity</div>
                            </th>
                            <th>PriceTotal</th>
                            <th>Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ProductInCart.length > 0 ? (
                                ProductInCart.map((item,index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>
                                            <img src={`/public/image/product/${item.productImage}`} alt=''/>
                                        </td>
                                        <td>
                                            {item.productBrand.charAt(0).toUpperCase() + item.productBrand.slice(1).toLowerCase()} {item.productName}
                                        </td>
                                        <td>
                                            {Number(item.productPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        <td className='customQuantity'>
                                            <Button size="sm" variant='warning' onClick={() => handleMinus(item.productID)}>
                                                -
                                            </Button>
                                            <span>{item.productQuantity}</span>
                                            <Button size="sm" variant='warning' onClick={() => handlePlus(item.productID)}>
                                                +
                                            </Button>
                                        </td>
                                        <td>
                                            {Number(item.productPriceTotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        <td>
                                            <Button variant='danger' onClick={()=> handleDelete(item.ID)}>
                                                <BsTrash/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : ( 
                                <tr>
                                    <td colSpan={7}>No Data</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    </Col>
                    <Col xl={3}>
                        <div className="customDetail">
                            <h3>Cart Total</h3>
                            <ul>
                                <li>
                                    <p>Price Total</p>
                                    <div className="PriceTotal">{Number(PriceTotalInCart).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿</div>
                                </li>
                                <li>
                                    <p>Coupon</p>
                                    <div className="Coupon"> -</div>
                                </li>
                                <li>
                                    <p>Tax</p>
                                    <div className="tax"> 7%</div>
                                </li>
                                <li>
                                    <p>Total</p>
                                    <div className="total"> {Number(PriceTotalInCart + (PriceTotalInCart * 0.07)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿</div>
                                </li>
                            </ul>
                            <div className="customBtn">
                                <button className='btn btn-warning' onClick={ () => navigate('/cart/checkout')}>CheckOut</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    </>
    )
}

export default CartData