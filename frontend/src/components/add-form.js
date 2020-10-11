import React from 'react'

/**@class - DynamicForm
 **@description- dynamic form that updates via JS
 * @since - 1.0.0
 * @style - 
 * */
export default class DynamicForm extends React.Component
{
    constructor(props){
        this.state={
            posts:[],
            message:null,
            picker:document.getElementById("form-picker")
        }

    }

    componentDidMount=()=>{
        Axios.get('/blogs/all',
        (posts)=>{
            if(posts.length <= 0){
                this.setState({message:"No posts found"})
            }
            this.setState({posts:posts})
        })
    }
    handleRemove=(element)=>{

    }
    handleAdd=(element)=>{
        switch(element){
            case "heading":
                
        }

    }
    handleClick=(text)=>{
        switch(text){
            case "heading":
                this.state.picker.insertBefore(this.Heading)
                
        }
    }
    Heading=(props)=>{
        return(
            <div className="form-heading">
                <label for="heading">Heading:</label>
                <br/>
                <textarea name="heading" cols="50" rows="40"></textarea>
            </div>
        )
    }
    Image=(props)=>{
        return(
            <div className="form-image">
                <label for="image">Image:</label>
                <br/>
                <input type="file" name="image"/>
            </div>
        )
    }

    Video=(props)=>{
        return(
            <div className="form-video">
                <label for="video">Video:</label>
                <br/>
                <input type="file" name="video"/>
            </div>
        )
    }



    render=()=>{
        <div className="dynamic-form">
            <h1>Your posts</h1>
            <div className="form-posts">
                <div className="form-picker">
                    <div className="form-picker-img" onClick={this.handleClick}>
                        <i className="fa fa-image"/>
                        <p>Add an image</p>
                    </div>
                    <div className="form-picker-code">
                        <i className="fa fa-image"/>
                        <p>Add code</p>
                    </div>
                    <div className="form-picker-text">
                        <i className="fa fa-image"/>
                        <p>Add text</p>
                    </div>
                    <div className="form-picker-heading" onClick={}>
                        <i className="fa fa-image"/>
                        <p>Add a heading</p>
                    </div>
                </div>
            </div>
            <button type="submit">Submit</button>
        </div>

    }

}