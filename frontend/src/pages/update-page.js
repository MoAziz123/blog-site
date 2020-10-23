import React from 'react'
import Axios from 'axios'
import querystring from 'query-string'
import ReactDOM from 'react-dom'
/**@class - UpdatePage
 * @description - used to update a post
 * @since 1.0.0
 */
function Heading(props){
    return(
        <div className="heading">
            <label for="heading">Heading:</label>
            <br/>
            <input className="form-input" type="text" value={props.value} name="heading"/>
            <button onClick={(e)=>handleRemove(e)}>Delete</button>
            <button onClick={(e)=>handleElementUp(e.target.parentElement.parentElement)}>Up</button>
            <button onClick={(e)=>handleElementDown(e.target.parentElement.parentElement)}>Down</button>

        </div>
    )
}
function Image(props){
    return(
        <div className="image">
            <label for="image">Image:</label>
            <br/>
            <input className="form-input" type="file" value={props.value} name="image"/>
            <button onClick={(e)=>handleRemove(e)}>Delete</button>
            <button onClick={(e)=>handleElementUp(e.target.parentElement.parentElement)}>Up</button>
            <button onClick={(e)=>handleElementDown(e.target.parentElement.parentElement)}>Down</button>

        </div>
    )
}
function Text(props){
    return(
        <div className="text">
            <label for="image">Text:</label>
            <br/>
            <input className="form-input" type="text" name="text" value={props.value}/>
            <button onClick={(e)=>handleRemove(e)}>Delete</button>
            <button onClick={(e)=>handleElementUp(e.target.parentElement.parentElement)}>Up</button>
            <button onClick={(e)=>handleElementDown(e.target.parentElement.parentElement)}>Down</button>

        </div>
    )
}
function handleRemove(element){
    element.target.parentElement.parentElement.remove()
}

function handleElementUp(element){
    const headElement = document.getElementById("form-inputs")
    if(element.previousSibling.previousSibling)
    {
        headElement.insertBefore(element, element.previousSibling)
    }

}
function handleElementDown(element){
    const headElement = document.getElementById("form-inputs")
    if(element.nextSibling.nextSibling)
    {
        headElement.insertBefore(element, element.nextSibling.nextSibling)

    }
}
export default class UpdatePage extends React.Component
{
    constructor(){
        super()
        this.state = {
            post:"",
            message:null
        }
    }
    componentDidMount(){
        this.setState({post:[], message:null})
        Axios.post("http://localhost:8080/posts/searchOne", 
            {id:this.props.location.state.id}
        )
        .then((response)=>{
            this.setState({
                post:response.data.post,
                message:response.data.message,
            })
            
        })
        .catch(error=>console.error(error))
        
    }
    handleSubmit()
    {
        let elements = document.getElementsByClassName("form-input")
        let element
        let data_array = []
        let tags = document.getElementById("tags").value.split(",")
        for(element of elements){
                data_array.push({
                    name:element.getAttribute("name"),
                    data:element.value
                })
        }
        Axios.put('http://localhost:8080/posts/update', {
            id:this.props.location.state.id,
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
                }
            })
    }
    render=()=>{
            return(
                <div className="dynamic-form">
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