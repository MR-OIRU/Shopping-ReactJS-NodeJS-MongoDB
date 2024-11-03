import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { BsSearch, BsCart, BsHeart } from "react-icons/bs";
import { useQuantityInCart, useProductInCart, usePriceInCart,
    useQuantityInWishlist,useProductInWishlist } from '../CartContext';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import axios from 'axios';

const ShowProduct = () => {
    const [data,setData] = useState([])
    const [cart, setCart] = useState({})
    const [wishlist, setWishlist] = useState({})
    const url = import.meta.env.VITE_API_URL;
    const [User,setUser] = useState('')
      //cart
    const { setQuantityInCart } = useQuantityInCart();
    const { setProductInCart} = useProductInCart();
    const { setPriceTotalInCart } = usePriceInCart();
    //wishlist
    const { setQuantityInWishlist } = useQuantityInWishlist();
    const { setProductInWishlist } = useProductInWishlist();

    useEffect (()=>{
        axios.get(`${url}product`).then((res) => {
            setData(res.data.products)
            setUser(res.data.session && res.data.session.Cart ? res.data.session.Cart : '');
        }).catch((err) => console.log(err));
    },[])
      
    const AddCart = (productID) => {
        if(!User){
          withReactContent(Swal).fire({
            icon: "warning",
            title: "Please register or log in to order the Product.",
            showCancelButton: true,
            confirmButtonColor: "#198754",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location = "/login"
            }
          });
        }else{
          const Token = `cart_${User}`;
          const UserCart = JSON.parse(localStorage.getItem(Token)) || null
          const DataCart = UserCart.cart
          const CheckProductInCart = DataCart.find(product => product.productID === productID)
            if(CheckProductInCart){
              const timeAdded = CheckProductInCart.addedAt;
              const timeDifference = Math.floor((Date.now() - timeAdded) / 60000);
              const timeMessage = timeDifference < 1 ? "a moment ago" : `${timeDifference} minutes ago`;
              withReactContent(Swal).fire({
                title: "ADD YOU Cart?",
                icon: "warning",
                html: `You already have this item in your cart. <br/> Added ${timeMessage}`,
                showCancelButton: true,
                confirmButtonColor: "#198754",
                cancelButtonColor: "#d33",
                confirmButtonText: "ADD"
              }).then((result) => {
                if (result.isConfirmed) {
                  setCart({ productID, addedAt: Date.now() });
                  Swal.fire({
                    title: "ADD Cart!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                  })
                }
              });
            }else{
              withReactContent(Swal).fire({
                title: "ADD YOU Cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#198754",
                cancelButtonColor: "#d33",
                confirmButtonText: "ADD"
              }).then((result) => {
                if (result.isConfirmed) {
                  setCart({ productID, addedAt: Date.now() });
                  Swal.fire({
                    title: "ADD Cart!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                  })
                }
              });
            }
        }
      }
      useEffect(()=>{
        if(Object.keys(cart).length > 0){
          if(User){
            axios.post(`${url}product/addCart`, cart).then((res)=>{
              const data = res.data.Product
              const Product = {
                productID : data.ProductID,
                productBrand : data.brand[0].BrandName,
                productName : data.ProductName,
                productQuantity : 1,
                productPrice : data.SellPrice,
                productPriceTotal : data.SellPrice,
                productImage : data.ProductImage,
                addedAt: cart.addedAt
                }
    
                const Token = `cart_${User}`;
                const UserCart = JSON.parse(localStorage.getItem(Token)) || [];
                const DataCart = UserCart.cart
                const existingProduct = DataCart.find(item => item.productID === Product.productID);
        
                if (existingProduct) {
                  existingProduct.productQuantity += 1;
                  existingProduct.productPriceTotal = existingProduct.productPrice * existingProduct.productQuantity;
                } else {
                  DataCart.push(Product);
                }
                let TotalQuantityInCart = 0
                  for (const product of DataCart) {
                      TotalQuantityInCart += product.productQuantity; 
                  }
                UserCart.TotalQuantityInCart = TotalQuantityInCart;
                setQuantityInCart(UserCart.TotalQuantityInCart) // Set Quantity
                setProductInCart(DataCart) // set ProductData
                  const TotalPrice = UserCart.cart.reduce((price, item) => {
                    return price + (parseInt(item.productPriceTotal, 10) || 0); 
                  }, 0);
                UserCart.TotalPriceInCart = TotalPrice
                setPriceTotalInCart(TotalPrice) // set PriceTotal
                localStorage.setItem(`cart_${User}`, JSON.stringify(UserCart))
            })
          }
        }
      },[cart])
      
      const AddWishlist = (productID) =>{
        if(!User){
          withReactContent(Swal).fire({
            icon: "warning",
            title: "Please register or log in to order the Product.",
            showCancelButton: true,
            confirmButtonColor: "#198754",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location = "/login"
            }
          });
        }else{
          const Token = `cart_${User}`
          const UserWishlist = JSON.parse(localStorage.getItem(Token)) || null
          const DataWishlist = UserWishlist.wishlist
          const CheckProductInWishlist = DataWishlist.find((product) => product.productID === productID)
          if(CheckProductInWishlist){
            const timeAdded = CheckProductInWishlist.addedAt;
            const timeDifference = Math.floor((Date.now() - timeAdded) / 60000);
            const timeMessage = timeDifference < 1 ? "a moment ago" : `${timeDifference} minutes ago`;
            withReactContent(Swal).fire({
              position: "center",
                  icon: "warning",
                  title: "Warning",
                  html: `You already have this item in your wishlist. <br/> Added ${timeMessage}`,
                  confirmButtonColor: "#d33",
            })
          }else{
            withReactContent(Swal).fire({
              title: "ADD YOU Wishlist?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#198754",
              cancelButtonColor: "#d33",
              confirmButtonText: "ADD"
            }).then((result) => {
              if (result.isConfirmed) {
                setWishlist({productID, addedAt: Date.now() });
                Swal.fire({
                  title: "ADD Wishlist!",
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false
                })
              }
            });
          }
        }
      }

    
      useEffect(()=>{
        if(Object.keys(wishlist).length > 0){
          if(User){
            axios.post(`${url}product/addWishlist`, wishlist).then((res) => {
                const data = res.data.Product
                const Product = {
                  productID : data.ProductID,
                  productBrand : data.brand[0].BrandName,
                  productName : data.ProductName,
                  productQuantity : 1,
                  productPrice : data.SellPrice,
                  productPriceTotal : data.SellPrice,
                  productImage : data.ProductImage,
                  addedAt: wishlist.addedAt
                }
                const Token = `cart_${User}`;
                const UserCart = JSON.parse(localStorage.getItem(Token)) || null
                const DataCart = UserCart.wishlist
                DataCart.push(Product)
                let TotalQuantityInWishlist = 0
                  for (const product of DataCart) {
                      TotalQuantityInWishlist += product.productQuantity; 
                  }
                UserCart.TotalQuantityInWishlist = TotalQuantityInWishlist;
                setQuantityInWishlist(UserCart.TotalQuantityInWishlist) // Set Quantity
                setProductInWishlist(DataCart) // set ProductData
                localStorage.setItem(`cart_${User}`, JSON.stringify(UserCart))
            })
          }
        }
      },[wishlist])
  return (
    <>
    <Container>
        <div className='customShow'>
          <Row>
          {data.map((item,index) => (
            <Col sm={6} md={4} lg={3} key={index} className='customCard'>
              <Card>
                <Card.Img variant="top" src= {`/image/product/${item.ProductImage}`} />
                <Card.Body>
                  <Card.Title>
                    <p className='brand'>{item.brand.length > 0 
                                          ? item.brand[0].BrandName.charAt(0).toUpperCase() + item.brand[0].BrandName.slice(1).toLowerCase()
                                          : "Unknown Brand"}</p>
                  </Card.Title>
                  <Card.Text>
                    {item.ProductName}
                  </Card.Text>
                  <p className='price'>฿ {Number(item.SellPrice).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
                </Card.Body>
                  <div className="customBtn">
                    <Button variant="warning"><BsSearch/></Button>
                    <Button variant="warning" onClick={ () => AddCart(item.ProductID)}><BsCart/></Button>
                    <Button variant="warning" onClick={ () => AddWishlist(item.ProductID)}><BsHeart/></Button>
                  </div>
              </Card>
            </Col>
          ))}
          </Row>
        </div>
      </Container>
    </>
  )
}

export default ShowProduct