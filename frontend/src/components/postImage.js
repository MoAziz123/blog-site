import React from 'react'
import Axios from 'axios'
import hash from 'crypto-js'
/**@class - PostImage
 * @description - used to handle PostImages
 * @since - 1.0.0
 */
export default class PostImage extends React.Component{

    constructor(props){
        super(props)
        this.state={
            image_data:this.props.image_data
        }
    }
    getImageData(data){
        let req_link = 'http://localhost:8080/file/getimage/' + data
        Axios.get(req_link)
        .then((response)=>{
            if(!response.data.success){
                this.setState({image_data:"Unable to find image"})
            }
            this.setState({image_data:req_link})
        })
    }
    componentDidMount(){
            this.getImageData(this.props.image_data)
        
    }

    render(){
        return <img className="post-image" src={this.state.image_data}/>
    }

}