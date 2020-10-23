import React from 'react'
import Axios from 'axios'
function Comment(props)
{
    return(
    <div className="comment-post">
        <div className="profile">

        </div>
        <div className="content-wrapper">
            <div className="content">
                <p>{this.props.comment.text}</p>
            </div>
            <div className="options">
                <p>{this.props.comment.edited}</p>
                <p>{this.props.comment.date_posted}</p>
                <button onClick={(e)=>this.handleEdit()}>Edit</button>
                <button onClick={(e)=>this.handleDelete()}>Delete</button>
            </div>
        </div>
    </div>)
}
export default class Comments extends React.Component{

    constructor(props)
    {
        super()
        this.state={
            comments:[]

        }
    }
    componentDidMount(){
        Axios.post('http://localhost:8080/comment/search', {id:this.props.id})
        .then((res)=>{
            this.setState({
                comments:res.data.comments
            })
        })
    }

    render(){
        return(
        <div className="comments">
            <div className="comment-input">
                <label for="comment">Comment: </label>
                <textarea name="comment"></textarea>
                <button type="submit" onClick={(e)=>this.handleSubmit()}>Post</button>
            </div>
            {
                this.state.comments && this.state.comments.map((comment)=>{
                    <Comment comment={comment}/>
                })
            }
        </div>)
    }
}