import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import {userContext} from '../contexts/userContext'
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
                <Link to="/add">Add a post</Link>
                <Link to="/">View posts</Link>
                <Link to="/myposts">View my posts</Link>
                <Link to="/login">Logout</Link>
            </ul>
        </div>
        </div>)

    }
}