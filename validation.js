 function validateText(){

}

 function validateTitle(title){

    return title != "" && String(title).length < 50 ? "" : "Title - needs to be less than 50 characters"

}

 function validateByline(byline){
    return byline != "" && String(byline).length < 100 ? "" : "Byline - needs to be less than 50 characters in length"
}
 function validateDescription(description){
    return description != "" && String(description).length < 250 ? "" : "Description - needs to be less than 250 characters in length"

}
 function validateImage(image){
    if(image != null){
        let ext_arr = image.split(".")
        let ext = ext_arr[ext_arr.length - 1]
        if(ext == "jpeg" || ext == "jpg" || ext == "png"){
            return ""
        }
        return "Image - should be of jpeg, jpg, or png type"
    }
    else{
        return "Image should not be null"
    }
}
 function validateTags(tags){
    if(tags != ""){
        try{
            return tags.split("/").length > 0 ? "" : "Tags - should be in the format '<tag>,<tag>,<tag>'"
        }
        catch(error){
            return "Tags - should be in the format '<tag>, <tag, <tag> and not null"
        }
    }
    else{
        return "Tags - should not be null"
    }
    


}

//TODO: include regex for this
 function validateEmail(email){

    let pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    return pattern.test(email) ? "" : "Email - should contain at least 1 @ and 1 ."

}

//TODO:include regex for this
 function validatePassword(password){

    let pattern = /^(?=.*[A-z])(?=.*[0-9])(?=.*[!"£$%^&*()@{#};:,.]).{8}$/
    return pattern.test(password) ? "" : "Password - should be greater than 8 characters and contain at least 1 uppercase, lowercase, numerical and special character"
}

 function validateUsername(name){

    return name != "" && name.length < 100 ? "" : "Name - should be less than 100 characters in length, with no numbers"

}

module.exports = {
                validateByline, 
                validateDescription, 
                validateEmail, 
                validatePassword,
                validateTitle,
                validateUsername
}