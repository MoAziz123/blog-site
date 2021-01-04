import React from 'react'
import {Redirect} from 'react-router-dom'

/**
 * @class - Error
 * @description - shows the 404 Error 
 * @since 1.0.0
 */
 export default class Error extends React.Component{
    constructor(){
        super()
        this.state={
            redirect:null
        }
    }
    componentDidMount=()=>{
        this.setState({
            redirect:null
        })
    }
    handleRedirect=()=>{
        this.setState({
            redirect:"/posts"
        })
    }

    render(){
        if(this.state.redirect){
            return(<Redirect to={this.state.redirect}/>)
        }
        return(
            <>
            <h1>ERROR 404</h1>
            <p>No page found. Try going back to 
                <a className="link" onClick={(e)=>this.handleRedirect()}> the homepage?</a>
            </p>
            </>
        )
    }
 }

