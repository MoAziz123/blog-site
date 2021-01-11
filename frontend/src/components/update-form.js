import React from 'react'
import Axios from 'axios'
import querystring from 'query-string'
import path from 'path'

import userContext from '../contexts/userContext'
import {idContext} from '../contexts/idContext'

import ReactDOM from 'react-dom'

import Image from '../components/post-image'
import Text from '../components/post-text'
import Heading from '../components/post-heading'

import { validateImage } from './validation'

/**@class - UpdateForm
 * @description - used to update a post
 * @since 1.0.0
 */
export default class UpdateForm extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            post:"",
            message:null
        }
    }
    
    componentDidMount(){
        this.setState({post:[], message:null})
        
    }
    
    handleSubmit()
    {
        let elements = document.getElementsByClassName("form-input")
        let element
        let data_array = []
        let tags = document.getElementById("tags").value.split(",")
        for(element of elements){
            if(element.getAttribute("name") == "image")
            {
                if(validateImage(element.files[0].name) == ""){
                    const image = new FormData()
                    image.append("image", element.files[0], element.files[0].name)
                    Axios.post('/api/file/uploadimage', image)
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
        Axios.put('/api/posts/update', {
            id:this.state.id,
            title:this.state.post.title,
            date:this.state.post.date,
            description:this.state.post.description,
            byline:this.state.post.byline,
            data:data_array,
            tags:tags
        })
        .then((res)=>{
            
            this.setState({post:[],message:res.data.message})
        })
        
       console.log(this.state)
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



    handleUpdate()
    {
        let tags = document.getElementById("tags").value.split(",")
        this.setState({
                post:{
                    id:this.state.id,
                    title:document.getElementById("title").value,
                    date:document.getElementById("date").value,
                    description:document.getElementById("description").value,
                    byline:document.getElementById("byline").value, 
                    private:document.getElementById("private").value                   
                }
            })
    }
    render=()=>{
        return(<div className="dynamic-form">
                <p>{this.state.message}</p>
                <h1>Update a post</h1>
                <div id="form-inputs">
                    <div className="s-required">
                        <div>
                            <label for="title">Title:</label>
                            <input className="form-input-required" id="title" type="text" value={this.state.post.title} onChange={(e)=>{this.handleUpdate()}} name="title"/>
                        </div>
                        <div className="">
                        <label for="date">Date:</label>
                            <input className="form-input-required" id="date" type="date" value={this.state.post.date} onChange={(e)=>{this.handleUpdate()}} name="date"/>
                        </div>
                        <div>
                            <label for="byline">Byline:</label>
                            <input className="form-input-required" id="byline" type="text" value={this.state.post.byline} onChange={(e)=>{this.handleUpdate()}} name="byline"/>
                        </div>
                        <div>
                            <label for="description">Description:</label>
                            <input className="form-input-required" id="description" type="text" value={this.state.post.description} onChange={(e)=>{this.handleUpdate()}} name="description"/>
                        </div>
                        <div >
                        <label for="tags">Tags:</label>
                            <input className="form-input-required" id="tags" type="text"  value={this.state.post.tags} name="tags"/>
                        </div>
                        <div>
                    <label for="private">Private:</label>
                        <input className="form-input-required" id="private" type="checkbox" name="private" value={this.state.post.private}/>
                    </div>
                    </div>
                    {  
                       this.state.post.data && this.state.post.data.map((item)=>{
                        const newNode = document.createElement("div")
                        const refElement = document.getElementById("form-picker")
                        const headElement = document.getElementById("form-inputs")
                        if(item.name == "heading"){
                            headElement.insertBefore(newNode, refElement)
                            ReactDOM.render(<Heading value={item.data}/>, newNode)
                        }
                        else if(item.name == "image"){
                            console.log("hi")
                            headElement.insertBefore(newNode, refElement)
                            ReactDOM.render(<Image value={item.data}/>, newNode)
                        }
                        else if(item.name == "text"){
                            headElement.insertBefore(newNode, refElement)
                            ReactDOM.render(<Text value={item.data}/>, newNode)
                        }
                       })
                      
                   }
                    <div id="form-picker">
                        <div className="form-picker-img" onClick={(e)=>this.handleClick("image")}>
                            <i className="fa fa-image"/>
                            <p>Add an image</p>
                        </div>
                       
                        <div className="form-picker-img" onClick={(e)=>this.handleClick("text")}>
                            <i className="fa fa-image"/>
                            <p>Add text</p>
                        </div>
                        <div className="form-picker-img" onClick={(e)=>this.handleClick("heading")}>
                            <i className="fa fa-image"/>
                            <p>Add a heading</p>
                        </div>
                    </div>
                </div>
                <button type="button" onClick={(e)=>this.handleSubmit()}>Submit</button>
            </div>)
           
        }
        
}