import React from 'react'

/**@class -  */
export default class PostPreview extends React.Component{
    constructor(props)
    {
        super(props)
    }
    render(){
        return(<div className="preview-post">
            <div className="post-row">
                <p className="title">{this.props.title}</p>
                <p className="byline">by {this.props.byline}</p>
                <p className="date">Date: {this.props.date}</p>
                <div className="post-tags">
                {
                    this.props.tags.map((tag)=>{
                        return(
                            <div className="post-tag">
                                <text>{tag}</text>
                            </div>
                        )
                    })
                }
                </div>
                <p className="description">{this.props.description}</p>
                <a href="./html"className="link">Read More...</a>
            </div>
            <div className="post-options">
                <button className="post-button" onClick={(e)=>this.handleDelete(this.props.post_id)}>Edit</button>
                <button className="post-button" onClick={(e)=>this.handleEditLoad(this.props.post_id)}>Delete</button>
                <button className="post-button" onClick={(e)=>this.handleView(this.props.post_id)}>View</button>
            </div>
        </div>)

    }

}