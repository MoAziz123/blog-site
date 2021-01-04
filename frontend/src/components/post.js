import React from 'react'
import Axios from 'axios'
import NavBar from './nav-bar'
import PostImage from './postImage'
import  queryString from 'query-string'
import { enc } from 'crypto-js'
import { Redirect, Link } from 'react-router-dom'
import Tag from './tag'
import {mongoToRealDate} from './conversion'

/**@class - Post
 * @description - shows a post from the db
 * @since 1.0.0
 */
export default class Post extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            post:[],
            redirect:null

        }


    }
    handleUserClick(){
        this.setState({redirect:"/users/" + this.state.post.user_id})

    }
    componentWillMount(){
        let id = window.location.pathname.split("/")[2]
        console.log(id)
        Axios.get('http://localhost:8080/posts/' + id)
        .then((res)=>{
            this.setState({post:res.data.post})

        })
    }
    render(){
        if(this.state.redirect){
            return(<Redirect to={this.state.redirect}/>)
        }
        return(
            <>
            <div className="post">
            <div className="post-row-row">
                <p className="title">{this.state.post.title}</p>
                <Link  className="byline" to={"/users/" + this.state.post.user_id}>by {this.state.post.byline}</Link>
                <p className="date">Date: {mongoToRealDate(this.state.post.date)}</p>
                <div className="post-tags">
                {
                    this.state.post.tags && this.state.post.tags.map((tag)=>{
                        return(
                            <Tag tag={tag}/>
                        )
                    })
                }
                </div>
                <div className="post-content">
                {
                    this.state.post.data && this.state.post.data.map((item)=>{
                        
                        if(item.name == "heading")
                        {
                            return(<h1 className="post-heading">{item.data}</h1>)
                        }
                        else if(item.name == "text")
                        {
                            return(<p className="post-text">{item.data}</p>)
                        }
                        else if(item.name == "image")
                        {
                            return (<PostImage className="post-post-image" image_data={item.data}/>)
                            
                                
                        }
                    })

                }
                </div>
            </div>
            </div>
            </>
        )
    }
}