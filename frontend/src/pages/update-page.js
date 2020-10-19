import React from 'react'
import Axios from 'axios'
import DynamicForm from '../components/dynamic-form'
import querystring from 'query-string'
/**@class - UpdatePage
 * @description - used to update a post
 * @since 1.0.0
 */
export default class UpdatePage extends DynamicForm
{
    constructor(props){
        super()
        this.state = {
            post:null,
            message:null
        }
    }
    componentDidMount(){
        const id = querystring.parse(window.location.search).id
        Axios.post("http://localhost:8080/posts/searchOne", 
            {id:id}
        )
        .then((response)=>{
            console.log(response)
            this.setState({
                post:response.data.post,
                message:response.data.message
            })
        })
        
    }
    
    render(){
            return(
                <div className="dynamic-form">
                <p>{this.state.message}</p>
                <h1>Update a post</h1>
                <div id="form-inputs">
                    <div className="s-required">
                        <div>
                            <label for="title">Title:</label>
                            <input className="form-input-required" id="title" type="text" value={this.state.post.title} name="title"/>
                        </div>
                        <div className="">
                        <label for="date">Date:</label>
                            <input className="form-input-required" id="date" type="date" value={this.state.post.date} name="date"/>
                        </div>
                        <div>
                            <label for="byline">Byline:</label>
                            <input className="form-input-required" id="byline" type="text" value={this.state.post.byline}  name="byline"/>
                        </div>
                        <div>
                            <label for="description">Description:</label>
                            <input className="form-input-required" id="description" type="text" value={this.state.post.description} name="description"/>
                        </div>
                        <div >
                        <label for="tags">Tags:</label>
                            <input className="form-input-required" id="tags" type="text" value={this.state.post.tags} name="tags"/>
                        </div>
                    </div>
                    {
                        this.state.post.data.map((item)=>{
                            this.handleClick(item.name)
                            
                        })
                    }
                    <div id="form-picker">
                        <div className="form-picker-img" onClick={(e)=>this.handleClick("image")}>
                            <i className="fa fa-image"/>
                            <p>Add an image</p>
                        </div>
                       
                        <div className="form-picker-text" onClick={(e)=>this.handleClick("text")}>
                            <i className="fa fa-image"/>
                            <p>Add text</p>
                        </div>
                        <div className="form-picker-heading" onClick={(e)=>this.handleClick("heading")}>
                            <i className="fa fa-image"/>
                            <p>Add a heading</p>
                        </div>
                    </div>
                </div>
                <button type="button" onClick={(e)=>this.handleSubmit()}>Submit</button>
            </div>)
        }
        
}