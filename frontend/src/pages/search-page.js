import React from 'react'
import Axios from 'axios'
import PostPreview from '../components/preview-post'
import NavBar from '../components/nav-bar'
import SearchPosts from '../components/search-posts'

/**
 * @class-SearchPage
 * @description - page container for search-posts
 * @since - 1.0.0.
 */
export default class SearchPage extends React.Component{

    
    render(){
        return(
            <>
          <NavBar/>
            <div className="main-page">
            <p>{this.state.message}</p>
            <div className="header-section">
                <h1>Your posts</h1>
            </div>
            <SearchPosts/>
        </div>
        </>
        )
    }

}