import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import getUser from '../contexts/auth'
import {userContext} from '../contexts/userContext'
function NavBarView2()
{
        if(localStorage.getItem('x-access-token'))
        {
            return(<AuthNavBarView/>)
        }
        else
        {
            return(<NavBarView/>)
        }
}
function NavBarView()
{
    return(<div className="navbar">
    <div className="links-wrapper">
        <ul className="links">
            <Link to="/login">Log In</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/search">Search posts</Link>
        </ul>
    </div>
</div>
)
}
function handleLogout()
{
    localStorage.removeItem('x-access-token')
}
function AuthNavBarView()
{
    return(
        <div className="navbar">
        <div className="links-wrapper">
            <ul className="links">
                <Link to="/add">Add a post</Link>
                <Link to="/posts">View posts</Link>
                <Link to="/myposts">View my posts</Link>
                <Link to="/search">Search posts</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/login" onClick={(e)=>handleLogout()}>Logout</Link>
            </ul>
        </div>
        </div>)

}
export default class NavBar extends React.Component
{
    constructor(){
        super()
        this.state ={
            redirect:null
        }
        
    }
    componentWillMount(){
        getUser()
    }
    render(){
        return(
        <NavBarView2/>
        )
    }
   
}