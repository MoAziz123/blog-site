import React from 'react'
import {Redirect, Link} from 'react-router-dom'

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
   
    render(){
       
        return(
        <div className="post-tag">
            <Link className="link-tag" to={"/tags/"+this.props.tag}>{this.props.tag}</Link>
        </div>)
    }
 }