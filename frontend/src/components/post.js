import React from 'react'
import Axios from 'axios'

/**@class - Post
 * @description - shows a post from the db
 * @since 1.0.0
 */
export default class Post extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            post:[]

        }

    }
    componentWillMount(){
        Axios.post('http://localhost:8080/posts/searchOne', {id:this.props.id})
        .then((res)=>{
            this.setState({post:res.data.post})
        })
    }
    render(){
        return(
            <div className="post">
            <div className="post-row">
                <p className="title">{this.state.post.title}</p>
                <p className="byline">by {this.state.post.byline}</p>
                <p className="date">Date: {this.state.post.date}</p>
                <div className="post-tags">
                {
                    this.state.post.tags && this.state.post.tags.map((tag)=>{
                        return(
                            <div className="post-tag">
                                <text>{tag}</text>
                            </div>
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
                    })
                }
                </div>
            </div>
            </div>
        )
    }
}