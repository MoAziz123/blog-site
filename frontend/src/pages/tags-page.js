import React from 'react'
import NavBar from '../components/nav-bar'
import Axios from 'axios'
import Posts from '../components/posts'
export default class TagsPage extends React.Component{
    constructor(props){
        super(props)
    }
    escapeSpecialChars=(unsafe)=>{
        return unsafe
        .replace("%20", " ")
    }
    render(){
        return(
            <>
                <NavBar/>
                <div className="main-page">
                    <div className="header-section">
                        <h1>Posts containing "{this.escapeSpecialChars(window.location.pathname.split("/")[2])}" </h1>
                    </div>
                    <Posts tag={this.escapeSpecialChars(window.location.pathname.split("/")[2])}/>
                </div>
                </>
        )
    }
}