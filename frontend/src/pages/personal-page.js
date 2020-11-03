import React from 'react'
import Axios from 'axios'
import MainPage from './main-page'
import PostPreview from '../components/preview-post'
import {userContext} from '../contexts/userContext'
import NavBar from './components/nav-bar'

export default class PersonalPage extends MainPage
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
        const user_context = React.useContext(userContext)
        Axios.get('http://localhost:8080/searchUser',
        {
            user_id:user_context.user.id
        })
        .then((res)=>{
            this.setState({posts:res.data.posts})
        })
    }
    render(){
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
        
                                return(<PostPreview user={this.props.location.state.user} id={post._id} title={post.title} description={post.description} tags={post.tags} date={post.date} byline={post.byline}/>)
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