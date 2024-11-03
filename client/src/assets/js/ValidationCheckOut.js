function ValidationCheckOut(values) {
    let error = {}
    const name_pattern  = /^[A-Za-zก-๙0-9]+$/
    const email_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const zip_pattern = /^[0-9!@]+$/
    const phone_pattern = /^[+-]?\d+(\.\d+)?$/
    const address_pattern  = /^[A-Za-zก-๙0-9\s\-\.,\/]+$/

    if(values.FirstName == ""){
        error.FirstName = "";
    }else if(!name_pattern.test(values.FirstName)){
        error.FirstName = "Please enter [ English  Or Thai ]";
    }else if(values.FirstName.length < 3){
        error.FirstName = "FirstName is too short"
    }else{
        error.FirstName = "Info submitted";
    }

    if(values.LastName == ""){
        error.LastName = "";
    }else if(!name_pattern.test(values.LastName)){
        error.LastName = "Please enter [ English  Or Thai ]";
    }else if(values.LastName.length < 3){
        error.LastName = "LastName is too short"
    }else{
        error.LastName = "Info submitted";
    }

    if(values.Email == ""){
        error.Email = "";
    }else if(!email_pattern.test(values.Email)){
        error.Email = "Please enter your email address correctly.";
    }else{
        error.Email = "Info submitted";
    }
    
    if(values.StreetAddress == ""){
        error.StreetAddress = "";
    }else if(!address_pattern.test(values.StreetAddress)){
        error.StreetAddress = "Please enter your StreetAddress. [ Thai , English , Number]";
    }else if(values.StreetAddress.length < 10){
        error.StreetAddress = "StreetAddress is too short"
    }else{
        error.StreetAddress = "Info submitted";
    }

    if(values.Province == ""){
        error.Province = "";
    }else if(!name_pattern.test(values.Province)){
        error.Province = "Please enter your Province. [ English  Or Thai ]";
    }else{
        error.Province = "Info submitted";
    }

    if(values.ZIP == ""){
        error.ZIP = "";
    }else if(!zip_pattern.test(values.ZIP)){
        error.ZIP = "Please enter your ZIP. [Number]";
    }else if(values.ZIP.length < 5 || values.ZIP.length > 5){
        error.ZIP = `Please enter your ZIP ( ${values.ZIP.length}/5 )`;
    }else{
        error.ZIP = "Info submitted";
    }

    if(values.Phone == ""){
        error.Phone = "";
    }else if(!phone_pattern.test(values.Phone)){
        error.Phone = "Please enter your Phone.";
    }else if(values.Phone.length < 10 || values.Phone.length > 10){
        error.Phone = `Please enter your Phone ( ${values.Phone.length}/10 )`;
    }else{
        error.Phone = "Info submitted";
    }

   return error;
}

export default ValidationCheckOut