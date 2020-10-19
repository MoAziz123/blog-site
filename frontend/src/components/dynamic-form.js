import React from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
function Heading(props){
    return(
        <div className="heading">
            <label for="heading">Heading:</label>
            <br/>
            <input className="form-input" type="text" name="heading"/>
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
            <input className="form-input" type="file" name="image"/>
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
            <input className="form-input" type="text" name="text"/>
            <button onClick={(e)=>handleRemove(e)}>Delete</button>
            <button onClick={(e)=>handleElementUp(e.target.parentElement.parentElement)}>Up</button>
            <button onClick={(e)=>handleElementDown(e.target.parentElement.parentElement)}>Down</button>

        </div>
    )
}
function handleRemove(element){
    element.target.parentElement.parentElement.remove()
}

function Video(props){
    return(
        <div className="video">
            <label for="video">Video:</label>
            <br/>
            <input className="form-input" type="file" name="video"/>
            <button onClick={(e)=>handleRemove(e)}>Delete</button>
        </div>
    )
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
        }
    }

    handleSubmit=()=>{
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
        console.log(data_array, document.getElementById("title").value, document.getElementById("date").value,document.getElementById("tags").value)
        Axios.post('http://localhost:8080/posts/new', {
            title:document.getElementById("title").value,
            date:document.getElementById("date").value,
            description:document.getElementById("description").value,
            byline:document.getElementById("byline").value,
            data:data_array,
            tags:tags
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
        else if(text == "video"){
            headElement.insertBefore(newNode, refElement)
            ReactDOM.render(<Video/>, newNode)
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
                <div className="s-required">
                    <div>
                        <label for="title">Title:</label>
                        <input className="form-input-required" id="title" type="text" name="title"/>
                    </div>
                    <div className="">
                    <label for="date">Date:</label>
                        <input className="form-input-required" id="date" type="date" name="date"/>
                    </div>
                    <div>
                        <label for="byline">Byline:</label>
                        <input className="form-input-required" id="byline" type="text" name="byline"/>
                    </div>
                    <div>
                        <label for="description">Description:</label>
                        <input className="form-input-required" id="description" type="text" name="description"/>
                    </div>
                    <div >
                    <label for="tags">Tags:</label>
                        <input className="form-input-required" id="tags" type="text" name="tags"/>
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