export function validateText(){

}

export function validateTitle(title){

    return String(title).length < 50 ? "" : "Title - needs to be less than 50 characters"

}

export function validateByline(byline){
    return String(byline).length < 50 ? "" : "Byline - needs to be less than 50 characters in length"
}
export function validateDescription(description){
    return String(description).length < 250 ? "" : "Description - needs to be less than 250 characters in length"

}
export function validateImage(image){
    let ext_arr = image.split(".")
    let ext = ext_arr[ext_arr.length - 1]
    if(ext == "jpeg" || ext == "jpg" || ext == "png"){
        return ""
    }
    return "Image - should be of jpeg, jpg, or png type"
}
export function validateTags(tags){

    return tags.split("/").length > 0 ? "" : "Tags - should be in the format '<tag>,<tag>,<tag>' "
  


}
