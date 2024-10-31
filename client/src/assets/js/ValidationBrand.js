function Validation(values) {
    let error = {}
    const eng_number_pattern  = /^[A-Za-z0-9]+$/
    const eng_thai_pattern  = /^[A-Za-zก-๙0-9]+$/
    
    if(values.BrandName === ""){
        error.BrandName = ""
    }else if(!eng_thai_pattern.test(values.BrandName)){

        error.BrandName = "Please enter [ English Thai Number]"
    }else if(values.BrandName.length < 3){

        error.BrandName = "BrandName is too short"
    }else{
        error.BrandName = "Info submitted";
    }

   return error;
}

export default Validation