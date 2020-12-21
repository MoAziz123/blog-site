import React from 'react'
import PostPreview from './preview-post'
import Axios from 'axios'
import {userContext} from '../contexts/userContext'
import getUser from '../contexts/auth'
import Spinner from './spinner'

/**@class - MainPosts
 * @description - used to show posts 
 */
export default class Posts extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            posts:[],
            message:null,
            loading:false
        }
    }
    componentWillMount=()=>{
        this.setState({loading:true})
        if(this.props.post_type == "personal"){
            if(localStorage.getItem('x-access-token')){
            
                Axios.post('http://localhost:8080/auth/decode',{
                    token:localStorage.getItem('x-access-token')
                })
                .then((response)=>{
                    userContext.user = response.data.user
                    return Axios.post('http://localhost:8080/posts/searchUser',{
                        user_id:userContext.user.id
                    })
    
                })
                .then((res)=>{
                    this.setState({posts:res.data.posts, loading:false})
                })
            }
        }
        else if(this.props.tag){
            console.log(this.props.tag)
            Axios.get('http://localhost:8080/posts/tags/' + this.props.tag)
            .then((res)=>this.setState({posts:res.data.posts, loading:false}))
        }
        else{
            Axios.get('http://localhost:8080/posts')
            .then((res)=>{
                this.setState({posts:res.data.posts, loading:false})
            })
        }
        
    }

    render=()=>{
        if(this.state.loading){
            return (<Spinner/>)
        }
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