import React ,{ useEffect, useState }from 'react'
import { Offcanvas, Row, Col } from 'react-bootstrap';
import { BsHeart, BsTrash } from "react-icons/bs";
import { useQuantityInWishlist,useProductInWishlist, useCartUser } from '../../CartContext';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../../../assets/css/WishlistData.css'

function OffCanvasWishlist({ ...props }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const { CartUser } = useCartUser();
    const { setQuantityInWishlist } = useQuantityInWishlist();
    const { ProductInWishlist, setProductInWishlist} = useProductInWishlist();
    useEffect(()=>{
       //------------------------ query Product in LocalStorage --------------------------
      if(CartUser){
        const token = `cart_${CartUser}`;
        const userCart = JSON.parse(localStorage.getItem(token)) || null
        if(userCart){
          setProductInWishlist(userCart.wishlist)
        }
      }
    },[CartUser])
    //------------------------ Delete Product in LocalStorage --------------------------
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
          const token = `cart_${CartUser}`;
          const userCart = JSON.parse(localStorage.getItem(token)) || null
          const productToRemove = userCart.wishlist.find((data) => data.ID === productID)
          if(productToRemove){
            userCart.TotalQuantityInWishlist -= productToRemove.productQuantity;
            userCart.wishlist = userCart.wishlist.filter((data) => data.ID !== productID);
            localStorage.setItem(token, JSON.stringify(userCart));
            setProductInWishlist(userCart.wishlist);
            setQuantityInWishlist(userCart.TotalQuantityInWishlist)
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
    return (
      <>
      <div className="customIcon">
            <BsHeart onClick={handleShow}/>
      </div>
        <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h2 className='ms-5 pt-3'>Wishlist</h2></Offcanvas.Title>
        </Offcanvas.Header>
          <Offcanvas.Body>
            <hr/>
            <div className="wishlistDetail">
              {ProductInWishlist.length > 0 ? (
                  ProductInWishlist.map((item, index) => (
                    <Row key={index}>
                      <Col lg={12}>
                        <div className="wishlistProduct">
                          <div className="product_img">
                            <img src={`/public/image/product/${item.productImage}`} alt="" />
                          </div>
                          <div className="product_Name">
                            <p>{item.productName}</p>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="productPrice">
                          <p className="brand">{item.productBrand}</p>
                          <p className="quantity"> x {item.productQuantity}</p>
                          <p className="price"> ฿ {Number(item.productPrice).toLocaleString()}.00</p>
                          <button className="btn btn-sm btn-danger mb-3"onClick={ () => handleDelete(item.ID)}><BsTrash /></button>
                        </div>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <span>No Have Product in Wishlist</span>
              )}
            </div>
            <hr/>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
function Wishlist() {
  return (
    <>
    {['end'].map((placement, idx) => (
        <OffCanvasWishlist key={idx} placement={placement}/>
      ))}
    </>
  )
}

export default Wishlist