import React from 'react'
import PostPreview from '../components/preview-post'
import Axios from 'axios'

/**@class - MainPage
 * @description - used to show posts 
 */
export default class MainPage extends React.Component
{
    constructor(){
        super()
        this.state={
            posts:[],
            message:null
        }
    }
    componentDidMount=()=>{
        Axios.get('http://localhost:8080/posts')
        .then((res)=>{
            this.setState({posts:res.data.posts})
        })
    }

    render=()=>{
        return(
        <div className="main-page">
            <p>{this.state.message}</p>
            <div className="header-section">
                <h1>Your posts</h1>
            </div>
            <div className="posts-section">
            {
                this.state.posts.map((post)=>{
                    if(this.state.posts.length > 0){
                        return(<PostPreview id={post._id} title={post.title} description={post.description} tags={post.tags} date={post.date} byline={post.byline}/>)
                    }
                    else{
                        return(<p>No Results Found</p>)
                    }
                })
            }
            </div>
        </div>)
    }
    
}