import React from 'react'
import ReactDOM from 'react-dom'
function Heading(props){
    return(
        <div className="form-input heading">
            <label for="heading">Heading:</label>
            <br/>
            <input type="text" name="heading"/>
            <button onClick={(e)=>handleRemove(e)}>Delete</button>
        </div>
    )
}
function Image(props){
    return(
        <div className="form-input image">
            <label for="image">Image:</label>
            <br/>
            <input type="file" name="image"/>
            <button onClick={(e)=>handleRemove(e)}>Delete</button>
        </div>
    )
}
function Text(props){
    return(
        <div className="form-input text">
            <label for="image">Text:</label>
            <br/>
            <input type="text" name="text"/>
            <button onClick={(e)=>handleRemove(e)}>Delete</button>
            <button onClick={(e)=>handleElementUp(e)}>Up</button>
            <button onClick={(e)=>handleElementDown(e)}>Down</button>

        </div>
    )
}
function handleRemove(element){
    element.target.parentElement.parentElement.remove()
}

function Video(props){
    return(
        <div className="form-input video">
            <label for="video">Video:</label>
            <br/>
            <input type="file" name="video"/>
            <button onClick={(e)=>this.handleRemove(e)}>Delete</button>
         

        </div>
    )
}
function handleElementUp(element){
    const headElement = document.getElementById("form-inputs")
    console.log(headElement, element.target.parentElement)
    const old_position=element.target.parentElement
    headElement.insertBefore(element.target.parentElement, old_position)
    old_position.remove()

}
function handleElementDown(element){
    const headElement = document.getElementById("form-inputs")
    const old_position=element.target
    headElement.insertAfter(element.target, old_position)
    old_position.remove()
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
            posts:[],
            message:null,
            picker:null
        }

    }

    componentDidMount=()=>{
        /*Axios.get('/blogs/all',
        (posts)=>{
            if(posts.length <= 0){
                this.setState({message:"No posts found"})
            }
            this.setState({posts:posts})
        })*/
    }
    
    handleSubmit=(element)=>{
        const elements = document.getElementsByClassName("form-input")
        let data_array = []
        for(element in elements){
            data_array.push({
                name:element.name,
                data:element.value
            })
        }
        //axios.post('/blog/add', data_array)

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
            <h1>Add a post</h1>
            <div id="form-inputs">
                <div className="form-input">
                    <label for="title">Title:</label>
                    <input type="text" name="title"/>
                </div>
                <div className="form-input">
                <label for="date">Date:</label>
                    <input type="date" name="title"/>
                </div>
                <div className="form-input">
                <label for="tags">Tags:</label>
                    <input type="text" name="tags"/>

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
            <button type="button">Submit</button>
        </div>
        )

    }

}