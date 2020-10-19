import Axios from 'axios'
import React from 'react'
import { Redirect } from 'react-router-dom'

/**@class -  */
export default class PostPreview extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            id:this.props.id,
            redirect:null
        }
    }
    handleDelete=(post_id)=>{
        console.log(post_id)
        Axios.delete("http://localhost:8080/posts/delete",{
            params:{
                id:post_id
            }
        })
        .then((res)=>{this.setState({message:res.message})})
    }

    handleEdit(id){
        this.setState({redirect: "update?id=" + id})
    }
    render(){
        if(this.state.redirect)
        {
            return(<Redirect to={this.state.redirect}/>)
        }
        return(<div className="preview-post">
            <div className="post-row">
                <p className="title">{this.props.title}</p>
                <p className="byline">by {this.props.byline}</p>
                <p className="date">Date: {this.props.date}</p>
                <div className="post-tags">
                {
                    this.props.tags.map((tag)=>{
                        return(
                            <div className="post-tag">
                                <text>{tag}</text>
                            </div>
                        )
                    })
                }
                </div>
                <p className="description">{this.props.description}</p>
                <a href=""className="link">Read More...</a>
            </div>
            <div className="post-options">
                <button className="post-button" onClick={(e)=>this.handleEdit(this.props.id)}>Edit</button>
                <button className="post-button" onClick={(e)=>this.handleDelete(this.props.id)}>Delete</button>
            </div>
        </div>)

    }

}