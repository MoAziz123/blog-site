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
                
            <PostPreview title={"Scenarios of Ending - Plato's Theorem"} byline={'Mo'} tags={['comedy', 'blood']} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac placerat vestibulum lectus mauris. Est sit amet facilisis magna. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Elementum nibh tellus molestie nunc non blandit massa enim nec. Nam at lectus urna duis convallis convallis tellus id. Sed vulputate odio ut enim blandit volutpat maecenas. Convallis tellus id interdum velit laoreet id donec. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Enim praesent elementum facilisis leo vel fringilla. Odio euismod lacinia at quis risus sed."} date={"12/02/2020"} post_id={"date"}/>
            <PostPreview title={"The Soul Self - Socrates"} byline={'Peter'} tags={['philsophy', 'magic']} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac placerat vestibulum lectus mauris. Est sit amet facilisis magna. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Elementum nibh tellus molestie nunc non blandit massa enim nec. Nam at lectus urna duis convallis convallis tellus id. Sed vulputate odio ut enim blandit volutpat maecenas. Convallis tellus id interdum velit laoreet id donec. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Enim praesent elementum facilisis leo vel fringilla. Odio euismod lacinia at quis risus sed."} date={"12/02/2020"} post_id={"date"}/>
            {
                this.state.posts.map((post)=>{
                    if(this.state.posts.length <= 0){
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