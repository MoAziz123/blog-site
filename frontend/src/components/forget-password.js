import React from 'react'
import Axios from 'axios'
import {Redirect, Link} from 'react-router-dom'

/**
 * @class - ForgetPassword
 * @description - component to allow users to enter lost password
 * @since 1.2.0
 */

export default class ForgetPassword extends React.Component{

    constructor(props){
        super(props)
        this.state={
            email:"",
            message:"Please enter your email. If it is found in the database, an email shall be sent within 24 hours."
        }
    }
    handleSubmit(){
        if(!this.state.email){
            this.setState({
                message:"Email should not be blank"
            })
        }
        else{
            Axios.post('/api/login/forget', {
                email:this.state.email
            })
            .then((response)=>{
                this.setState({message:response.data.message})
            })
            .catch(error=>{
                console.log(error)
                this.setState({message:"Unable to send data to server"})
            })
        }
       

    }

    render(){
        return(
                <div className="login-form">
                    <p>{this.state.message}</p>
                    <div className="login-element">
                        <label for="email">Email:</label>
                        <br/>
                        <input type="email" name="email" onChange={(e)=>this.setState({state:this.state, email:e.target.value})}/>
                    </div>
                    <button onClick={(e)=>this.handleSubmit()}>Submit</button>
                </div>
        )
    }
}