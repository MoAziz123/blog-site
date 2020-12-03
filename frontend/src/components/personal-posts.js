import React from 'react'
import Axios from 'axios'
import MainPage from './main-page'
import PostPreview from '../components/preview-post'
import {userContext} from '../contexts/userContext'
/**
 * @class - PersonalPosts
 * @description - shows personal posts of the user
 * @since 1.0.0
 */
export default class PersonalPosts extends React.Component{
    constructor(props){
        super(props)
        this.state={
            posts:[],
            message:null
        }
    }
    componentDidMount()
    {
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
                this.setState({posts:res.data.posts})
            })
        }
    }

    render=()=>{
        return(
            <div className="posts-section">
            {
                this.state.posts.map((post)=>{
                    if(this.state.posts.length > 0){

                        return(<PostPreview user={userContext.user} post={post}/>)
                    }
                    else{
                        return(<p>No Results Found</p>)
                    }
                })
            }
            </div>
        )
    }
}