import React from 'react'
import Axios from 'axios'
import MainPage from './main-page'
import PostPreview from '../components/preview-post'
import {userContext} from '../contexts/userContext'
import NavBar from '../components/nav-bar'

export default class PersonalPage extends React.Component
{
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
    render(){
        return(
                <>
                <NavBar/>
                <div className="main-page">
                    <p>{this.state.message}</p>
                    <div className="header-section">
                        <h1>Your posts</h1>
                    </div>
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
                </div>
                </>)
    }
}