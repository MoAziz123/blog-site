import React from 'react'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'

/**@class - RegisterForm
 * @description - the form for users to submit login/password
 * @since 1.0.0/
 */
export default class RegisterForm extends React.Component{
    
    constructor(){
        super()
        this.state ={
            redirect:false
        }

    }
    handleSubmit()
    {
        Axios.post('http://localhost:8080/login/register', {email:this.state.email, password:this.state.password, name:this.state.name})
        .then((response)=>{
            console.log(response.data)
            
        })
    }

    render(){
        if(this.state.redirect)
        {
            return(<Redirect to={this.state.redirect}/>)
        }
        return(
            <div className="login-form">
                <label for="name">Name:</label>
                <input type="text" name="name" onChange={(e)=>this.setState({state:this.state, name:e.target.value})}/>
                <label for="email">Email:</label>
                <input type="email" name="password" onChange={(e)=>this.setState({state:this.state, email:e.target.value})}/>
                <label for="password">Password:</label>
                <input type="password" name="password" onChange={(e)=>this.setState({state:this.state, password:e.target.value})}/>
                <button type="submit" onClick={(e)=>this.handleSubmit()}>Register</button>
            </div>
        )

    }
}