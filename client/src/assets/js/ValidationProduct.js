import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function validationProduct(product) {
    let error = {}
    const id_pattern  = /^[a-zA-Z0-9]+$/
    const text_pattern  = /^[a-zA-Z0-9\s\-\(\)]+$/
    const number_pattern = /^[0-9]+$/
    const validTypes = ["image/jpeg","image/jpg"];
    if(!product.productID){    
        error.productID = "Please enter ID [English , Number]";
    }else if(!id_pattern.test(product.productID)){
        error.productID = "Please enter ID [English , Number]";
    }else{
        error.productID = "";
    }

    if(!product.productBrand){
        error.productBrand = "Please select Brand";
    }else{
        error.productBrand = "";
    }

    if(!product.productName){
        error.productName = "Please enter Name [English , Number]";
    }else if(!text_pattern.test(product.productName)){
        error.productName = "Please enter Name [English , Number]";
    }else{
        error.productName = "";
    }

    if(!product.productPrice){
        error.productPrice = "Please enter Price [Number]";
    }else if(!number_pattern.test(product.productPrice)){
        error.productPrice = "Please enter Price [Number]";
    }else{
        error.productPrice = "";
    }

    if(!product.productQuantity){
        error.productQuantity = "Please enter Quantity [Number]";
    }else if(!number_pattern.test(product.productQuantity)){
        error.productQuantity = "Please enter Quantity [Number]";
    }else{
        error.productQuantity = "";
    }

    if (!product.productImage) {
        withReactContent(Swal).fire({
          icon: 'error',
          title: 'กรุณาเลือกรูปภาพ',
          confirmButtonColor: '#EB5353',
          confirmButtonText: 'ยืนยัน',
        })
        return false;
    }
    
    else if(!validTypes.includes(product.productImage.type)){
        withReactContent(Swal).fire({
            icon: 'error',
            title: 'กรุณาเลือกรูปภาพให้ถูกต้อง',
            text: 'นามสกุล.jpg หรือ .jpeg',
            confirmButtonColor: '#EB5353',
            confirmButtonText: 'ยืนยัน',
          })
      return false;
    }else{

    }
   return error;
}

export default validationProduct