import Axios from 'axios'
import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import {userContext} from '../contexts/userContext'
import {idContext} from '../contexts/idContext'

import PostImage from './postImage'
import Tag from './tag'
import {mongoToRealDate} from './conversion'
/**@class - PostPreview
 * @description - 
  */
export default class PostPreview extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            id:this.props.post._id,
            redirect:null,
            deleted:null
        }

    }
    
    handleView(){
        idContext.id = this.state.id

        this.setState({redirect:"/posts/" + this.props.post._id})

    }
    handleDelete=()=>{
        Axios.post("http://localhost:8080/posts/delete", {id:this.props.post._id})
        .then((res)=>{this.setState({message:res.message, deleted:true})})
    }

    handleEdit(d){
        idContext.id = this.state.id
        this.setState({redirect:"/update/" + this.props.post._id})
    }
    render(){
        if(this.state.deleted){
            return(<Redirect to={window.location.pathname}/>)
        }
        if(this.state.redirect)
        {
            return(<Redirect to={{
                pathname:this.state.redirect
            }}/>)
        }

        try{
        if(userContext.user.id == this.props.post.user_id)
        {
            return(<div className="preview-post">
            <div className="post-row">
                <p className="title">{this.props.post.title}</p>
                <Link  className="byline" to={"/users/" + this.props.post.user_id}>by {this.props.post.byline}</Link>
                <p className="date">Date: {mongoToRealDate(this.props.post.date)}</p>
                <div className="post-tags">
                {
                    this.props.post.tags.map((tag)=>{
                        if(tag == "" || tag == null){
                            return (<></>)
                        }
                            return(
                                <Tag tag={tag}/>
    
                            )
                    })
                }
                </div>
                <p className="description">{this.props.post.description}</p>
            </div>
           
            <div className="post-options">
                <button className="post-button" onClick={(e)=>this.handleEdit()}><i className="fa fa-pencil-square-o"/></button>
                <button className="post-button" onClick={(e)=>this.handleDelete()}><i className="fa fa-trash-o"/></button>                
                <a className="read-more" onClick={(e)=>this.handleView()}>Read More</a>
            </div>

        </div>)
           
        }
    }
    catch{}
        return(
        <div className="preview-post">
            <div className="post-row">
                <p className="title">{this.props.post.title}</p>
                <Link  className="byline" to={"/users/" + this.props.post.user_id}>by {this.props.post.byline}</Link>
                <p className="date">Date: {mongoToRealDate(this.props.post.date)}</p>
                <div className="post-tags">
                {
                    this.props.post.tags.map((tag)=>{
                        return(
                            <Tag tag={tag}/>
                        )
                    })
                }
                </div>
                <p className="description">{this.props.post.description}</p>
               
            </div>
            <div className="post-options">
                <a className="read-more" onClick={(e)=>this.handleView()}>Read More</a>
            </div>
        </div>)
        

    }

}