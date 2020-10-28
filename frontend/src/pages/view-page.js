import React from 'react'
import Axios from 'axios'
import Post from '../components/post'
import Comments from '../components/comments'
import {userContext} from '../contexts/userContext'

/**@class - ViewPage
 * @description - shows the article to the user
 * @since - 1.0.0
 */
export default class ViewPage extends React.Component{

    constructor(props){
        super(props)
        this.state={
            post:[],
            message:null
        }
    }

    componentDidMount(){
        console.log(this.props.location.state.user, this.props.location.state.id)
    
    }

    render(){
        return(
            <div className="view-page">
            <Post id={this.props.location.state.id}/>
            <Comments user={this.props.location.state.user} id={this.props.location.state.id}/>
            </div>
        )

    }
}