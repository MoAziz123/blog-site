import React from 'react'
import PostPreview from '../components/preview-post'
import Axios from 'axios'
import {userContext} from '../contexts/userContext'
/**@class - MainPage
 * @description - used to show posts 
 */
export default class MainPage extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            posts:[],
            message:null
        }
        console.log(userContext)
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

                        return(<PostPreview user={this.props.location.state.user} post={post}/>)
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