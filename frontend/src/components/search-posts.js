import React from 'react'
import Axios from 'axios'
import PostPreview from '../components/preview-post'
import Spinner from './spinner'

/**
 * @class - SearchPosts
 * @description - allows users to search posts
 * @since 1.0.0
 */
export default class SearchPosts extends React.Component{
    constructor()
    {
        super()
        this.state={
            posts:[], 
            message:"",
            query:""
        }
    }
    
    componentDidMount(){
        this.setState({loading:true})
        Axios.get('http://localhost:8080/posts')
        .then((res)=>{
            this.setState({posts:res.data.posts, loading:false})
        })
    }

    handleSearch(){
        this.setState({loading:true})
        Axios.post('http://localhost:8080/posts/search', {search:this.state.query})
        .then((res)=>{
            this.setState({posts:res.data.posts, loading:false})
        })
        
    }
    
    render=()=>{
        return(
            <>
            <div className="search-bar">
                    <label for="search">Search:</label>
                    <input type="text"  name="search" onChange={(e)=>{this.setState({query:e.target.value})}}/>
                    <button type="button" onClick={(e)=>this.handleSearch()}>Search</button>
            </div>
            <div className="posts-section">
            {
                this.state.loading && <Spinner/>
            }
            {
                !this.state.loading && this.state.posts && this.state.posts.map((post)=>{
                    if(this.state.posts.length > 0){
                        return(<PostPreview post={post}/>)
                    }
                    else{
                        return(<p>No Results Found</p>)
                    }
                })
            }
            </div>
            </>
        )
    }
}
