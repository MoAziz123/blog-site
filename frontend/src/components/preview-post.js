import Axios from 'axios'
import React from 'react'
import { Redirect } from 'react-router-dom'
import {userContext} from '../contexts/userContext'
import {idContext} from '../contexts/idContext'
/**@class - PostPreview
 * @description - 
  */
export default class PostPreview extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            id:this.props.post._id,
            redirect:null
        }

    }
    handleView(){
        idContext.id = this.state.id

        this.setState({redirect:"posts"})

    }
    handleDelete=(post_id)=>{
        Axios.delete("http://localhost:8080/posts/delete",{
            data:{
                id:post_id
            }
        })
        .then((res)=>{this.setState({posts:res.posts, message:res.message})})
    }

    handleEdit(id){
        idContext.id = this.state.id
        console.log(idContext.id)
        this.setState({redirect:"update"})
    }
    render(){
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
                <p className="byline">by {this.props.post.byline}</p>
                <p className="date">Date: {this.props.post.date}</p>
                <div className="post-tags">
                {
                    this.props.post.tags.map((tag)=>{
                        return(
                            <div className="post-tag">
                                <text>{tag}</text>
                            </div>
                        )
                    })
                }
                </div>
                <p className="description">{this.props.post.description}</p>
            </div>
            <div className="post-options">
                <button className="post-button" onClick={(e)=>this.handleEdit(this.props.post.id)}><i className="fa fa-pencil-square-o"/></button>
                <button className="post-button" onClick={(e)=>this.handleDelete(this.props.post.id)}><i className="fa fa-trash-o"/></button>                
                <a className="read-more" onClick={(e)=>this.handleView()}>Read More</a>
            </div>

        </div>)
           
        }
    }
    catch{console.log("hi")}
        return(
        <div className="preview-post">
            <div className="post-row">
                <p className="title">{this.props.post.title}</p>
                <p className="byline">by {this.props.post.byline}</p>
                <p className="date">Date: {this.props.post.date}</p>
                <div className="post-tags">
                {
                    this.props.post.tags.map((tag)=>{
                        return(
                            <div className="post-tag">
                                <text>{tag}</text>
                            </div>
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