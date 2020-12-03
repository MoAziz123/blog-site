import React from 'react'
import PostPreview from '../components/preview-post'
import Axios from 'axios'
import {userContext} from '../contexts/userContext'
import NavBar from '../components/nav-bar'
import getUser from '../contexts/auth'
import MainPosts from '../components/main-posts'

/**
 * @class - MainPage
 * @description - used to show posts - compartmentalized for ease of maintenance
 * @since 1.0.0
 */
export default class MainPage extends React.Component
{
    render=()=>{
        return(
        <>
            <NavBar/>
            <div className="main-page">
                <p>{this.state.message}</p>
                <div className="header-section">
                    <h1>Posts</h1>
                </div>
                <MainPosts/>
            </div>
        </>
        )
    }
    
}