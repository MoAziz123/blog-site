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
            <Link to="/">Posts</Link>
            <Link to="/search">Search posts</Link>
        </ul>
    </div>
    <div className="links-alt-wrapper">
            <ul className="links-alt-2">
            
            <Link to="/login">Log In</Link>
            <Link to="/">Posts</Link>
            <Link to="/search">Search posts</Link>    </ul>
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
                <Link to="/">View posts</Link>
                <Link to="/myposts">View my posts</Link>
                <Link to="/search">Search posts</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/login" onClick={(e)=>handleLogout()}>Logout</Link>
            </ul>
            
        </div>
        <div className="links-alt-wrapper">
            <ul className="links-alt">
                <Link to="/add"><i className="fa fa-2x fa-plus"/></Link>
                <Link to="/"><i className="fa fa-2x fa-home"/></Link>
                <Link to="/myposts"><i className="fa fa-2x fa-male"/></Link>
                <Link to="/search"><i className="fa fa-2x fa-search"/></Link>
                <Link to="/settings"><i className="fa fa-2x fa-cog"/></Link>
                <Link to="/login" onClick={(e)=>handleLogout()}><i className="fa fa-2x fa-sign-out"/></Link>
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