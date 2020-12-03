import React from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import {userContext} from '../contexts/userContext'
import getUser from '../contexts/auth'
import Heading from '../components/post-heading'
import Image from '../components/post-image'
import Text from '../components/post-text'


/**@class - DynamicForm
 **@description- dynamic form that updates via JS
 * @since - 1.0.0
 * @style - 
 * */
export default class DynamicForm extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            message:null,
            date:Date.now()
        }
        getUser()
    }
    componentWillMount(){
        getUser()
    }
    validateImage=(data)=>{
        let ext_arr = data.split(".")
        let ext = ext_arr[ext_arr.length - 1]
        console.log(ext, ext.length, "png" == ext)
        if(ext == "jpeg" || ext == "jpg" || ext == "png"){
            return true
        }
        return false

    }
    handleSubmit=()=>{
        let elements = document.getElementsByClassName("form-input")
        let element
        let data_array = []
        let tags = this.state.tags.split(",")
        for(element of elements){
            if(element.getAttribute("name") == "image")
            {
                if(this.validateImage(element.files[0].name)){
                    console.log(element.files[0].name)
                    const image = new FormData()
                    image.append("image", element.files[0], element.files[0].name)
                    Axios.post('http://localhost:8080/file/uploadimage', image)
                    .then(response=>console.log(response.data))
                    data_array.push({
                        name:element.getAttribute("name"),
                        data:element.files[0].name
                    })
                }
                else{
                    this.setState({message:"Unable to validate image - please ensure it is of a valid image format."})
                }
                            
            }
            else
            {
                data_array.push({
                    name:element.getAttribute("name"),
                    data:element.value
                })
            }
               
        }
        Axios.post('http://localhost:8080/posts/new', {
            title:this.state.title,
            date:this.state.date,
            description:this.state.description,
            byline:this.state.byline,
            data:data_array,
            tags:tags,
            private: this.state.private.checked ? true : false,
            user_id:userContext.user.id
        })
        .then((res)=>{
            this.setState({message:res.message})
        })
        
    }
    
    
    handleClick=(text)=>{
        const newNode = document.createElement("div")
        const refElement = document.getElementById("form-picker")
        const headElement = document.getElementById("form-inputs")
        if(text == "heading"){
            headElement.insertBefore(newNode, refElement)
            ReactDOM.render(<Heading/>, newNode)
        }
        else if(text == "image"){
            headElement.insertBefore(newNode, refElement)
            ReactDOM.render(<Image/>, newNode)
        }
        else if(text == "text"){
            headElement.insertBefore(newNode, refElement)
            ReactDOM.render(<Text/>, newNode)
        }
    }



    render=()=>{
        return(
        <div className="dynamic-form">
            <p>{this.state.message}</p>
            <h1>Add a post</h1>
            <div id="form-inputs">
                <div className="form-inputs-required">
                    <div>
                        <label for="title">Title:</label>
                        <input className="form-input-required" required id="title" type="text" name="title" onChange={(e)=>{this.setState({state:this.state, title:e.target.value})}}/>
                    </div>
                    <div className="re">
                    <label for="date">Date:</label>
                        <input className="form-input-required"  required value={this.state.date} onChange={(e)=>this.setState({state:this.state, date:e.target.value})} id="date" type="date" name="date"/>
                    </div>
                    <div>
                        <label for="byline">Byline:</label>
                        <input className="form-input-required" id="byline" required type="text" value={userContext.user?.name} name="byline" onChange={(e)=>{this.setState({state:this.state, byline:e.target.value})}}/>
                    </div>
                    <div>
                        <label for="description">Description:</label>
                        <input className="form-input-required" id="description" required type="text" name="description" onChange={(e)=>this.setState({state:this.state, description:e.target.value})}/>
                    </div>
                    <div >
                    <label for="tags">Tags:</label>
                        <input className="form-input-required" id="tags" required type="text" name="tags" onChange={(e)=>this.setState({state:this.state, tags:e.target.value})}/>
                    </div>
                    <div>
                    <label for="private">Private:</label>
                    <input className="form-input-required" id="private" type="checkbox" name="private" onChange={(e)=>this.setState({state:this.state, private:e.target.value})}/>
                    </div>
                    
                </div>
                <div id="form-picker">
                    <div className="form-picker-img" onClick={(e)=>this.handleClick("image")}>
                        <i className="fa fa-image"/>
                        <p>Add an image</p>
                    </div>
                   
                    <div className="form-picker-text" onClick={(e)=>this.handleClick("text")}>
                        <i className="fa fa-image"/>
                        <p>Add text</p>
                    </div>
                    <div className="form-picker-heading" onClick={(e)=>this.handleClick("heading")}>
                        <i className="fa fa-image"/>
                        <p>Add a heading</p>
                    </div>
                </div>
            </div>
            <button type="button" onClick={(e)=>this.handleSubmit()}>Submit</button>
        </div>
        )

    }

}