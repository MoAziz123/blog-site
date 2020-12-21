import React from 'react'
import {Redirect} from 'react-router-dom'

/**
 * @class - Tag
 * @description - class container for tag
 * @since 1.0.0
 */

 export default class Tag extends React.Component{

    constructor(props){
        super(props)
        this.state={
            redirect:null
        }
    }
    componentDidMount=()=>{
        let query = window.location.pathanme
    }
    handleTagClick(){
        this.setState({redirect:"/tags/" + this.props.tag })
    }
    render(){
        if(this.state.redirect){
            return(<Redirect from="/tags" to={this.state.redirect}/>)
        }
        return(
        <div className="post-tag">
            <a onClick={(e)=>{this.handleTagClick()}}>{this.props.tag}</a>
        </div>)
    }
 }