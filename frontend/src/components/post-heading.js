import React from 'react'


export default class PostHeading extends React.Component{
    constructor(props){
        super(props)
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
    
    render(){
        return(
            <div className="heading">
                <label for="heading">Heading:</label>
                <br/>
                <input className="form-input" value={this.props.value} type="text" name="heading"/>
                <button onClick={(e)=>this.handleRemove(e)}>Delete</button>
                <button onClick={(e)=>this.handleElementUp(e.target.parentElement.parentElement)}>Up</button>
                <button onClick={(e)=>this.handleElementDown(e.target.parentElement.parentElement)}>Down</button>
            </div>
        )
    }
}