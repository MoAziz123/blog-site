import React from 'react'
import Axios from 'axios'
import PostPreview from '../components/preview-post'
import NavBar from '../components/nav-bar'

/**@class-SearchPage
 * @description - allows users to search for blog posts
 * @since - 1.0.0.
 */
export default class SearchPage extends React.Component{

    constructor()
    {
        super()
        this.state={
            posts:[], 
            message:""
        }

    }
    componentDidMount()
    {
        Axios.get('http://localhost:8080/posts')
        .then((res)=>{
            this.setState({posts:res.data.posts})
        })
    }
    handleSearch(query)
    {
        console.log(query)
        Axios.post('http://localhost:8080/posts/search', {search:query})
        .then((res)=>{
            this.setState({posts:res.data.posts})
        })
        
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
            <div className="search-bar">
                <label for="search">Search:</label>
                <input type="text"  name="search" onChange={(e)=>{this.handleSearch(e.target.value)}}/>
            </div>
            <div className="posts-section">
            {
                this.state.posts && this.state.posts.map((post)=>{
                    if(this.state.posts.length > 0){
                        return(<PostPreview post={post}/>)
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