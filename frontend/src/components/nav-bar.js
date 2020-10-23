import React from 'react'
import {Link,Redirect} from 'react-router-dom'

export default class NavBar extends React.Component
{
    constructor(){
        super()
        this.state ={
            redirect:null
        }
    }

    render=()=>{
        return(
        
        <div className="navbar">
        <div className="links-wrapper">
            <ul className="links">
                <li>Add a post</li>
                <li>View posts</li>
                <li>Settings</li>
                <li>Log out</li>
            </ul>
        </div>
        </div>)

    }
}