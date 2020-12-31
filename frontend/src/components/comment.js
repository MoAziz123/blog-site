import React from 'react'
import Axios from 'axios'
import {userContext} from '../contexts/userContext'
import {mongoToRealDate} from './conversion'
import getUser from '../contexts/auth'

/**@class - Comment
 * @description - encapsulates a comment for the user to view
 * @since 1.0.0
 */
export default class Comment extends React.Component{
    constructor(props)
    {
        super(props)
        this.state ={
            edit:false,
            text:this.props.comment.text,
        }
        console.log(this.props.comment)
    }
    componentDidMount(){
        getUser()
    }
    handleDelete=()=>{
        let id = this.props.comment._id
        Axios.post("http://localhost:8080/comment/remove" , {data:{_id:id}})
        .then((res)=>{
            this.setState({state:this.state, deleted:true})
        })
    }
    handleEdit()
    {
        this.setState({edit:true})
    }
    handleBack()
    {
        this.setState({edit:false})
    }
    handleUpdate()
    {
        Axios.put('http://localhost:8080/comment/update', {
            id:this.props.comment._id,
            date_posted:Date.now(),
            text:this.state.text,
            edited:true
        })
        .then((post)=>{
            if(post.data.success){
                this.setState({state:this.state, edit:false, text:this.state.text})
            }
        })
    }
    render(){
        if(this.state.deleted){
            return(<></>)
        }
        if(this.state.edit)
            {
                return(
                    <div className="comment-post">
                        <div className="profile">
                            <img src="/"/>
                            <p>{this.props.comment.user_name}</p>
                
                        </div>
                        <div className="content-wrapper">
                            <div className="content">
                                <input type="text" value={this.state.text} onChange={(e)=>this.setState({state:this.state, text:e.target.value})}/>
                            </div>
                            <div className="options">
                                <p>In edit mode</p>
                                <p>{this.props.comment.date_posted}</p>
                                <button onClick={(e)=>this.handleBack()}>Back</button>
                                <button onClick={(e)=>this.handleUpdate()}>Update</button>
                                <button onClick={(e)=>this.handleDelete()}>Delete</button>
                            </div>
                        </div>
                    </div>)
            }
        try{
        if(userContext.user.id == this.props.comment.user_id )
        {
            return(<div className="comment-post">
                    <div className="profile">
                        <img src="/"/>
                        <p>{this.props.comment.user_name != null ? this.props.comment.user_name : 'username'} </p>
            
                    </div>
                    <div className="content-wrapper">
                        <div className="content">
                            <p>{this.state.text}</p>
                        </div>
                        <div className="options">
                            <p>{this.props.comment.edited}</p>
                            <p>{mongoToRealDate(this.props.comment.date_posted)}</p>
                            <button onClick={(e)=>this.handleEdit()}>Edit</button>
                            <button onClick={(e)=>this.handleDelete()}>Delete</button>
                        </div>
                    </div>
                </div>)
           
        }
    }
    catch(error)
    {
        console.log(error)
    }
        
            
            
                return(<div className="comment-post">
                <div className="profile">
                    <img src="/"/>
                    <p>{this.props.comment.user_name != null ? this.props.comment.user_name : 'username'} </p>
        
                </div>
                <div className="content-wrapper">
                    <div className="content">
                        <p>{this.state.text}</p>
                    </div>
                    <div className="options">
                        <p>{this.props.comment.edited}</p>
                        <p>{mongoToRealDate(this.props.comment.date_posted)}</p>
                    </div>
                </div>
            </div>)
            
        }

    }