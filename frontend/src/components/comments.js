import React from 'react'
import Axios from 'axios'
import Comment from './comment'
import {userContext} from '../contexts/userContext'
/**@class - Comments
 * @description - encapsulates the comments system
 * @since 1.0.0
 */
export default class Comments extends React.Component{

    constructor(props)
    {
        super(props)
        this.state={
            comments:[]

        }
    }
    componentDidMount(){
        Axios.post('http://localhost:8080/comment/search', {post_id:window.location.pathname.split("/")[2]})
        .then((res)=>{
            this.setState({
                comments:res.data.comments
            })
        })
    }
    handleSubmit()
    {
        try{
            Axios.post('http://localhost:8080/comment/add', {
                post_id:window.location.pathname.split("/")[2],
                text: this.state.text,
                user_name:userContext.user.name,
                user_id:userContext.user.id
            })
            .then((res)=>{
                this.setState({state:this.state, text:null})
                this.componentDidMount()
    
            })
        }
        catch
        {
            this.setState({state:this.state, message:"You need to login to post a comment."})
        }
      
    }

    render(){
        return(
        <div className="comments">
            <p>{this.state.message}</p>
            <div className="comment-input">
                <label for="comment">Comment: </label>
                <div className="comment-box">
                <textarea name="comment" onChange={(e)=>this.setState({state:this.state, text:e.target.value})}></textarea>
                <button type="submit" onClick={(e)=>this.handleSubmit()}>Post</button>
                </div>
            </div>
            {
               
                this.state.comments && this.state.comments.map((comment)=>{
                    return (
                        <userContext.Consumer>
                            {(value)=><Comment comment={comment}/>}
                        </userContext.Consumer>
                        )
                    
                })
                
            }
        </div>)
    }
}