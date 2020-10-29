import React from 'react'
import Axios from 'axios'
import Post from '../components/post'
import Comments from '../components/comments'
import {userContext} from '../contexts/userContext'
import {idContext} from '../contexts/idContext'

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
        console.log(idContext.id)
    }

    render(){
        return(
            <div className="view-page">
            <Post id={idContext.id}/>
            <Comments user={userContext.user} id={idContext.id}/>
            </div>
        )

    }
}