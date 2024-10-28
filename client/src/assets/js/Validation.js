function Validation(values) {
    let error = {}

    const eng_number_pattern  = /^[A-Za-z0-9._-]+$/

    const eng_thai_pattern  = /^[A-Za-zก-๙]+$/
    const email_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const password_pattern = /^[A-Za-z0-9!@]+$/
    const phone_pattern = /^[+-]?\d+(\.\d+)?$/

    if(values.Username === ""){
        error.Username = ""
    }else if(!eng_number_pattern.test(values.Username)){

        error.Username = "Please enter [ English Number Or . - _ ]"
    }else if(values.Username.length < 3){

        error.Username = "Username is too short"
    }else{
        error.Username = "Info submitted";
    }

    if(values.FirstName === ""){
        error.FirstName = ""
    }else if(!eng_thai_pattern.test(values.FirstName)){

        error.FirstName = `Please enter [ English  Or Thai ]`

    }else if(values.FirstName.length < 3){
        error.FirstName = "FirstName is too short"
    }else{
        error.FirstName = "Info submitted";
    }

    if(values.LastName === ""){
        error.LastName = ""
    }else if(!eng_thai_pattern.test(values.LastName)){

        error.LastName = `Please enter [ English  Or Thai ]`

    }else if(values.LastName.length < 3){
        error.LastName = "LastName is too short"
    }else{
        error.LastName = "Info submitted";
    }

    if(values.Email === ""){
        error.Email = ""
    }else if(!email_pattern.test(values.Email)){
        error.Email = `Please enter your email address correctly.`
    }else{
        error.Email = "Info submitted";
    }

    if(values.Phone === ""){
        error.Phone = ""
    }else if(!phone_pattern.test(values.Phone)){
        error.Phone = "Please enter your Phone."
    }else if(values.Phone.length < 10 || values.Phone.length > 10){
        error.Phone = `Please enter your Phone ( ${values.Phone.length}/10 )`
    }else{
        error.Phone = "Info submitted";
    }

    if (values.Password === "") {
        error.Password = "";
    } else if (!password_pattern.test(values.Password)) {
        error.Password = "Please enter [ English , Number Or ! @ ]";
    } else if (values.Password.length < 4) {
        error.Password = "Password is too short";
    } else {
        error.Password = "Info submitted";
    }

    if (values.confirmPassword === "") {
        error.confirmPassword = "";
    }else{
        if (values.confirmPassword !== values.Password) {
            error.confirmPassword = "Password does not match."; 
        }else {
            error.confirmPassword = "Info submitted";
        }
    }


    if(values.Sex === "default"){
        error.Sex = "";
    }else if(values.Sex === ""){
        error.Sex = "Please select Sex!!"; 
    }
    else{
        error.Sex = "Info submitted";
    }

    if(values.Role === "default"){
        error.Role = "";
    }else if(values.Role === ""){
        error.Role = "Please select Role!!"; 
    }
    else{
        error.Role = "Info submitted";
    }

   return error;
}

export default Validation