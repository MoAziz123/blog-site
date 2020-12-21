/**
 * @description - conversion functions 
 */

 export function convertToHTMLDate(date, infix){
    let day = date.getDate().toString()
    let month = date.getMonth() +1
    month = month.toString()
    let year = date.getFullYear().toString()
    if(month.length < 2){
        month = "0" + month
    }
    return year + infix + month + infix + day

}
export function mongoToHTMLDate(date){
    try{ return date.toString().substring(0, 10)}
    catch{return date}
}

export function mongoToRealDate(date){
    try{

        let date_array = date.toString().substring(0, 10).split("-").reverse()
        let new_date = ""
        for(let item in date_array){
            new_date += date_array[item] + "/"
        }
        return new_date.substring(0, new_date.length-1)
    }
    catch{return date}
}