import React from 'react'

export default class NavBar extends React.Component
{
    constructor(){
        super()
    }
    componentDidMount=()=>{
        //axios req here
    }

    render=()=>{
        return(<div className="navbar">
        <div className="links-wrapper">
            <ul className="links">
                <li>Add a post</li>
                <li>More posts</li>
                <li>Settings</li>
                <li>Log out</li>
            </ul>
        </div>
        </div>)

    }
}