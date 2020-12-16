import React from 'react'
import Axios from 'axios'
import MainPage from './main-page'
import PostPreview from '../components/preview-post'
import {userContext} from '../contexts/userContext'
import NavBar from '../components/nav-bar'
import Posts from '../components/posts'

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
                    <div className="header-section">
                        <h1>Your posts</h1>
                    </div>
                    <Posts post_type="personal"/>
                </div>
                </>)
    }
}