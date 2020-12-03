import React from 'react'
import Axios from 'axios'
import MainPage from './main-page'
import PostPreview from '../components/preview-post'
import {userContext} from '../contexts/userContext'
import NavBar from '../components/nav-bar'
import PersonalPosts from '../components/personal-posts'

/**
 * @class - PersonalPage
 * @description - only displays the posts of the user
 * @since 1.0.0
 */
export default class PersonalPage extends React.Component
{
   
    render(){
        return(
                <>
                <NavBar/>
                <div className="main-page">
                    <p>{this.state.message}</p>
                    <div className="header-section">
                        <h1>Your posts</h1>
                    </div>
                    <PersonalPosts/>
                </div>
                </>)
    }
}