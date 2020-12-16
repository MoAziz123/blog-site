import React from 'react'
import {validateTitle, validateDescription, validateTags, validateDate, validateByline, validateImage}
from './validation'
/**@class - ValidationBox
 * @description - sets the errors box when errors are found within the application
 * @since 1.0.0
 */

export default class ValidationBox extends React.Component{
    constructor(props){
        super(props)
        this.state={
            errors:{
                title:"",
                description:"",
                data:"",
                byline:"",
                tags:"",
                private:"",
                date:""
            }
        }
    }

    validatePost=()=>{
        if(validateTitle(this.props.post.title)!= ""){
            this.setState({errors:{title:""}})
        }
    }

    validateDataArray=()=>{
        if(this.props.data){
            for(let item of data_array){
                if(item.name == "image"){
                    let image_error = validateImage(item.data) != ""
                    if(image_error){
                        this.setState({errors:{image:"Image - please ensure it has either .jpg, ,png, or .jpeg files"}})
                        return false
                    }
                    return true
                }
            }
        }
        else{
            let data_array = document.getElementsByClassName("form-input")
            for(let item of data_array){
                if(item.name == "image"){
                    let image_error = validateImage(item.data) != ""
                    if(image_error){
                        this.state.errors.data.push(image_error)
                        return false
                    }
                    return true
                }
            }
        }
    }

    render=()=>{
        if(this.state.errors){
            return(
                <div className="errors">
                    <p>{this.state.errors.title}</p>
                    <p>{this.state.errors.description}</p>
                    <p>{this.state.errors.byline}</p>
                    <p>{this.state.errors.date}</p>
                    {
                        this.state.errors.data && this.state.errors.data.map((item)=>{
                            return(<p>{item}</p>)
                        })
                    }
                    <p>{this.state.errors.private}</p>
                </div>

            )
        }
    }
}