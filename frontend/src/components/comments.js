import React from 'react'
import Axios from 'axios'
import Comment from './comment'
import {userContext} from '../contexts/userContext'
import getUser from '../contexts/auth'
import Spinner from './spinner'
/**@class - Comments
 * @description - encapsulates the comments system
 * @since 1.0.0
 */
export default class Comments extends React.Component{

    constructor(props)
    {
        super(props)
        this.state={
            comments:[],
            loading:true
        }
        console.log(userContext)

    }
    componentDidMount(){
        this.state.loading = true
        Axios.post('/api/comment/search', {post_id:window.location.pathname.split("/")[2]})
        .then((res)=>{
            this.setState({
                comments:res.data.comments,
                loading:false
            })
        })
    }
    handleSubmit()
    {
        try{
            Axios.post('/api/comment/add', {
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
        if(this.state.loading){
            return (<Spinner/>)
        }
        try{
            if(userContext.user.access != 1){
                return(
                    <div className="comments">
                        <p>{this.state.message}</p>
                        <div className="comment-input">
                            <label for="comment">Comment: </label>
                            <textarea name="comment" onChange={(e)=>this.setState({state:this.state, text:e.target.value})}></textarea>
                            <br/>
                            <p>You need to login to comment.</p>
                         </div>
                    </div>)
            }
        }
        catch{
            return(
                <div className="comments">
                    <p>{this.state.message}</p>
                    <div className="comment-input">
                            <p>You need to login to comment.</p>
                        <br/>
                     </div>
                </div>)
        }
        
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