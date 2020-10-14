import React from 'react'

/**@class -  */
export default class PostPreview extends React.Component{
    constructor(props)
    {
        super(props)
    }
    render=()=>{
        <div className="preview-post">
            <div className="post-row">
                <h4>{this.props.date}</h4>
                <h1>{this.props.title}</h1>
                <h3>{this.props.description}</h3>
            </div>
            <div className="post-options">
                <button className="post-button" onClick={this.handleDelete(this.props.post_id)}>Edit</button>
                <button className="post-button" onClick={this.handleEditLoad(this.props.post_id)}>Delete</button>
                <button className="post-button" onClick={this.handleView(this.props.post_id)}>View</button>
            </div>
        </div>

    }

}