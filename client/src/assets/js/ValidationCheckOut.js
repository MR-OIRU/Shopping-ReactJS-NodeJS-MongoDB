function ValidationCheckOut(values) {
    let error = {}
    const name_pattern  = /^[A-Za-zก-๙0-9]+$/
    const email_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const zip_pattern = /^[0-9!@]+$/
    const phone_pattern = /^[+-]?\d+(\.\d+)?$/
    const address_pattern  = /^[A-Za-zก-๙0-9\s\-\.,\/]+$/
    if(values.firstName == ""){
        error.firstName = "Please enter your FirstName [ Thai , English ]"
    }else if(!name_pattern.test(values.FirstName)){
        error.firstName = "Please enter your FirstName [ Thai , English ]"
    }else{
        error.firstName = "";
    }

    if(values.lastName == ""){
        error.lastName = "Please enter your LastName [ Thai , English ]"
    }else if(!name_pattern.test(values.lastName)){
        error.lastName = "Please enter your LastName [ Thai , English ]"
    }else{
        error.lastName = "";
    }

    if(values.Email == ""){
        error.Email = "Please enter your email address correctly."
    }else if(!email_pattern.test(values.Email)){
        error.Email = "Please enter your email address correctly."
    }else{
        error.Email = "";
    }

    if(values.CompanyName == ""){
        error.CompanyName = "Please enter your CompanyName."
    }else if(!address_pattern.test(values.CompanyName)){
        error.CompanyName = "Please enter your CompanyName. [ Thai , English , Number]"
    }else{
        error.CompanyName = "";
    }

    if(values.CountryRegion == ""){
        error.CountryRegion = "Please enter your CountryRegion."
    }else if(!address_pattern.test(values.CountryRegion)){
        error.CountryRegion = "Please enter your CountryRegion. [ Thai , English , Number]"
    }else{
        error.CountryRegion = "";
    }
    
    if(values.StreetAddress == ""){
        error.StreetAddress = "Please enter your StreetAddress."
    }else if(!address_pattern.test(values.StreetAddress)){
        error.StreetAddress = "Please enter your StreetAddress. [ Thai , English , Number]"
    }else{
        error.StreetAddress = "";
    }

    if(values.TownCity == ""){
        error.TownCity = "Please enter your TownCity."
    }else if(!address_pattern.test(values.TownCity)){
        error.TownCity = "Please enter your TownCity. [ Thai , English , Number]"
    }else{
        error.TownCity = "";
    }

    if(values.ZIP == ""){
        error.ZIP = "Please enter your ZIP."
    }else if(!zip_pattern.test(values.ZIP)){
        error.ZIP = "Please enter your ZIP."
    }else if(values.ZIP.length < 5 || values.ZIP.length > 5){
        error.ZIP = `Please enter your ZIP ( ${values.ZIP.length}/5 )`
    }else{
        error.ZIP = ""
    }

    if(values.Phone == ""){
        error.Phone = "Please enter your Phone."
    }else if(!phone_pattern.test(values.Phone)){
        error.Phone = "Please enter your Phone."
    }else if(values.Phone.length < 10 || values.Phone.length > 10){
        error.Phone = `Please enter your Phone ( ${values.Phone.length}/10 )`
    }else{
        error.Phone = ""
    }

   return error;
}

export default ValidationCheckOut