import React from 'react'
import Axios from 'axios'
import NavBar from '../components/nav-bar'
import Posts from '../components/posts'
import {userContext} from '../contexts/userContext'
import PostPreview from '../components/preview-post'
import Spinner from '../components/spinner'
import {mongoToRealDate} from '../components/conversion'
export default class UserPage extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            posts:[],
            user:{
                name:""
            }
        }
    }

    componentDidMount(){
        this.setState({loading:true})
        let id = window.location.pathname.split("/")[2]
        console.log(id)
        
        Axios.post('http://localhost:8080/posts/searchUser', {
                user_id: id
            })
        .then(res=>this.setState({state:this.state, posts:res.data.posts, loading:false}))
        Axios.post('http://localhost:8080/login/search',{
            id:id
        })
        .then(response=>{
            console.log(response.data)
            this.setState({user:response.data.user})
            
        })
    }

    render(){
        if(this.state.loading){
            return(  <>
                <NavBar/>
                <div className="main-page">
                    <div className="user-section">
                    </div>
                    <div className="post-section">
                    </div>
                    <h1>Posts for {this.state.user.name}</h1>
                    <div className="posts-section">
                    <Spinner/>
                </div>
                </div>
                </>)
        }
        return(
            <>
            <NavBar/>
            <div className="main-page">
                <div className="user-section">
                <h1>User Details</h1>
                <p>Name: {this.state.user.name}</p>
                <p>Date Joined: {mongoToRealDate(this.state.user.createdAt)}</p>
                <p>Posts Created: {this.state.posts.length} </p>

                </div>
                <div className="post-section">
                    
                </div>
                <h1>Posts for {this.state.user.name}</h1>
                
                <div className="posts-section">
            {
                this.state.posts && this.state.posts.map((post)=>{
                    if(this.state.posts.length > 0){
                        
                            return(
                            <userContext.Consumer>
                            {(value)=>(<PostPreview value={userContext} post={post}/>)}
                            </userContext.Consumer>
                        )
                    }
                })
            }
            </div>
            </div>
            </>)
    }
}