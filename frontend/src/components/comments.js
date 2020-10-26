import React from 'react'
import Axios from 'axios'
import Comment from './comment'

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
        Axios.post('http://localhost:8080/comment/search', {post_id:this.props.id})
        .then((res)=>{
            this.setState({
                comments:res.data.comments
            })
            console.log(this.state.comments)
        })
    }
    handleSubmit()
    {
        console.log(this.props.user)
        Axios.post('http://localhost:8080/comment/add', {
            post_id:this.props.id,
            text: this.state.text,
            user_name:this.props.user.name
        })
        .then((res)=>{
            this.setState({state:this.state, text:null})
            this.componentDidMount()

        })
    }

    render(){
        return(
        <div className="comments">
            <div className="comment-input">
                <label for="comment">Comment: </label>
                <textarea name="comment" onChange={(e)=>this.setState({state:this.state, text:e.target.value})}></textarea>
                <button type="submit" onClick={(e)=>this.handleSubmit()}>Post</button>
            </div>
            {
               
                this.state.comments && this.state.comments.map((comment)=>{
                    return (<Comment comment={comment}/>)
                })
            }
        </div>)
    }
}