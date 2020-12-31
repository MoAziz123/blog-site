import React from 'react'
import NavBar from '../components/nav-bar'
import Axios from 'axios'
import Posts from '../components/posts'
import {userContext} from '../contexts/userContext'

import PostPreview from '../components/preview-post'
import Spinner from '../components/spinner'
export default class TagsPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tag: this.props.match.params.tag,
            posts:[], 
            loading:true
        }
    }
    escapeSpecialChars=(unsafe)=>{
        return unsafe
        .replace("%20", " ")
    }
    componentWillMount(){
        this.state.loading = true
        Axios.get('http://localhost:8080/posts/tags/' + this.props.match.params.tag)
        .then(res=>this.setState({posts:res.data.posts, loading:false}))

    }
    
    componentDidUpdate(props, state){
        if(props.match.params.tag != state.tag){
            this.state.loading = true
            Axios.get('http://localhost:8080/posts/tags/' + props.match.params.tag)
            .then(res=>this.setState({posts:res.data.posts, loading:false}))
        }

    }
    render(){
        if(this.state.loading){
            
            return(
            <>
            <NavBar/>
                <div className="main-page">
                    <div className="header-section">
                        <h1>Posts containing "{this.escapeSpecialChars(this.props.match.params.tag)}" </h1>
                    </div>
                    </div>
            <Spinner/>
            </>)
        }
        return(
            <>
                <NavBar/>
                <div className="main-page">
                    <div className="header-section">
                        <h1>Posts containing "{this.escapeSpecialChars(this.props.match.params.tag)}" </h1>
                    </div>
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
                </div>
                </>
        )
    }
}