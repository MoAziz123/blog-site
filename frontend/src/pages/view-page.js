import React from 'react'
import Axios from 'axios'
import Post from '../components/post'
import Comments from '../components/comments'
import {userContext} from '../contexts/userContext'
import {idContext} from '../contexts/idContext'
import NavBar from '../components/nav-bar'
import getUser from '../contexts/auth'

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

    componentWillMount(){
       userContext.user = getUser()
       
    }

    render(){
        return(
            <>
              <NavBar/>
            <div className="view-page">
            <Post id={idContext.id}/>
            <Comments user={userContext.user} id={idContext.id}/>
            </div>
            </>
        )

    }
}