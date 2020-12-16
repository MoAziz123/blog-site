import React from 'react'
import PI from './postImage'
import md5 from 'crypto-js'
export default class PostImage extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props.value)
        this.state={
            image_name: this.props.value != null ? this.props.value.split("\\")[2] : "" 
        }
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
        this.setState({
            image_name: this.formatValue(image_data)
        })
    }
    render(){
        return(
            <div>
                <label for="image">Image:</label>
                {
                    this.state.image_name && 
                    (
                        <PI image_data={this.state.image_name}/>
                    )
                    
                }
                <br/>
                <p>{this.state.image_name}</p>
                <br/>
                <input className="form-input" type="file" name="image" onChange={(e)=>this.handleImageChange(e.target.value)}/>
                <button onClick={(e)=>this.handleRemove(e)}>Delete</button>
                <button onClick={(e)=>this.handleElementUp(e.target.parentElement.parentElement)}>Up</button>
                <button onClick={(e)=>this.handleElementDown(e.target.parentElement.parentElement)}>Down</button>
            </div>

        )
    }
}
