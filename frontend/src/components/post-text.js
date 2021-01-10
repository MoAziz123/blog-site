import React from 'react'

export default class PostText extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:this.props.value
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

    render=()=>{
        return(
            <div className="form-input-text">
                <label for="image">Text:</label>
                <br/>
                <textarea className="form-input"  type="text" name="text" onChange={(e)=>{this.setState({text:e.target.value})}}>{this.state.text}</textarea>
                <br/>
                <i className="component-button fa fa-trash-o" onClick={(e)=>this.handleRemove(e)}></i>
                <i className="component-button fa fa-arrow-up"onClick={(e)=>this.handleElementUp(e.target.parentElement.parentElement)}></i>
                <i className="component-button fa fa-arrow-down" onClick={(e)=>this.handleElementDown(e.target.parentElement.parentElement)}></i>
            
            </div>
        )
    }
}