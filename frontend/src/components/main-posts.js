import React from 'react'
import PostPreview from '../components/preview-post'
import Axios from 'axios'
import {userContext} from '../contexts/userContext'
import getUser from '../contexts/auth'

/**@class - MainPosts
 * @description - used to show posts 
 */
export default class MainPosts extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            posts:[],
            message:null
        }
    }
    componentWillMount=()=>{
        getUser()
        Axios.get('http://localhost:8080/posts')
        .then((res)=>{
            this.setState({posts:res.data.posts})
        })
    }

    render=()=>{
        return(
            <>

        
            <div className="posts-section">
            {
                this.state.posts.map((post)=>{
                    if(this.state.posts.length > 0){
                        if(!post.private)
                        {
                            return(
                            <userContext.Consumer>
                            {(value)=>(<PostPreview value={userContext} post={post}/>)}
                            </userContext.Consumer>
                        )

                        }
                        
                    }
                    else{
                        return(<p>No Results Found</p>)
                    }
                })
            }
            </div>
        </>)
    }
    
}