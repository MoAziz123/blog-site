import React from 'react'
import PostPreview from '../components/preview-post'

/**@class - MainPage
 * @description - used to show posts 
 */
export default class MainPage extends React.Component
{
    constructor(){
        super()
        this.state={
            posts:[]
        }
    }
    componentDidMount=()=>{
        /*Axios.get('/posts', (res)=>{
            this.setState({posts:res.posts})
        })*/
    }

    render=()=>{
        return(<div className="main-page">
            <div className="header-section">
                <h1>Your posts</h1>
            </div>
            <div className="posts-section">
            {
                this.state.posts.map((post)=>{
                    if(this.state.posts.length > 0){
                        return(
                            <PostPreview title={"title"} description={"description"} date={"date"} post_id={"date"}/>
                        )
                    }
                    else{
                        return(<p>No Results Found</p>)
                    }
                })
            }
            </div>
        </div>)
    }
    
}