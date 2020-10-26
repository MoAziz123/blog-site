import React from 'react'
import Axios from 'axios'
import Post from '../components/post'
import Comments from '../components/comments'
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
        console.log(this.props.location.state)
    
    }

    render(){
        return(
            <div className="view-page">
            <Post id={this.props.location.state.id}/>
            <Comments id={this.props.location.state.id}/>
            </div>
        )

    }
}