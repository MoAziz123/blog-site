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
    handleView(){
        this.setState({redirect:"posts"})

    }
    handleDelete=(post_id)=>{
        Axios.delete("http://localhost:8080/posts/delete",{
            params:{
                id:post_id
            }
        })
        .then((res)=>{this.setState({posts:res.posts, message:res.message})})
    }

    handleEdit(id){
        this.setState({redirect: "update"})
    }
    render(){
        if(this.state.redirect)
        {
            return(<Redirect to={{
                pathname:this.state.redirect,
                state:{id:this.state.id}
            }}/>)
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
            </div>
            <div className="post-options">
                <button className="post-button" onClick={(e)=>this.handleEdit(this.props.id)}><i className="fa fa-pencil-square-o"/></button>
                <button className="post-button" onClick={(e)=>this.handleDelete(this.props.id)}><i className="fa fa-trash-o"/></button>                
                <a className="read-more" onClick={(e)=>this.handleView()}>Read More</a>
            </div>

        </div>)

    }

}