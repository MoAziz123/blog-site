import React from 'react'
import PI from './postImage'
import md5 from 'crypto-js'
import {validateImage} from './validation'
import Axios from 'axios'
export default class PostImage extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props.value)
        this.state={
            image_name: this.props.value
        }
    }
    componentDidMount(){
        console.log(this.state.image_name)
    }
    handleElementDown(element){
        const headElement = document.getElementById("form-inputs")
        if(element.nextSibling.nextSibling)
        {
            headElement.insertBefore(element, element.nextSibling.nextSibling)
    
        }
    }

    handleElementUp(element){
        const headElement = document.getElementById("form-inputs")
        if(element.previousSibling.previousSibling)
        {
            headElement.insertBefore(element, element.previousSibling)
        }
    
    }

    handleRemove(element){
        element.target.parentElement.parentElement.remove()
    }
    formatValue=(data)=>{
        let image_name = data.split("\\")[2]
        return image_name
    }
    handleImageChange=(image_data)=>{
        if(validateImage(image_data.files[0]?.name ?? "") == ""){
            this.uploadImage(image_data.files[0])
        }
        this.setState({
            image_name: image_data.files[0].name
        })
    }
    uploadImage=(image_data)=>{
        const image = new FormData()
        image.append("image", image_data, image_data.name)
        Axios.post('http://localhost:8080/file/uploadimage', image)
        .then(response=>console.log(response.data))
    }
    render(){
        return(
            <div className="form-input-image">
                {
                    this.state.image_name &&(
                        <>
                        <label for="image">Image:</label>
                        <br/>
                        <PI image_data={this.state.image_name}/>
                        <p className="form-input" name="image">{this.state.image_name}</p>
                        </>
                    )
                }
                <br/>
                <br/>
                {
                    !this.state.image_name &&(
                        <input className="form-input" type="file" name="image" onChange={(e)=>this.handleImageChange(e.target)}/>

        )
                }
                <i className="component-button fa fa-trash-o" onClick={(e)=>this.handleRemove(e)}></i>
                <i className="component-button fa fa-arrow-up"onClick={(e)=>this.handleElementUp(e.target.parentElement.parentElement)}></i>
                <i className="component-button fa fa-arrow-down" onClick={(e)=>this.handleElementDown(e.target.parentElement.parentElement)}></i>
            </div>

        )
    }
}