import React from 'react'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'
import {userContext} from '../contexts/userContext'
import { validateEmail, validatePassword } from './validation'
/**@class - LogInForm
 * @description - the form for users to submit login/password
 * @since 1.0.0/
 */
export default class LogInForm extends React.Component{
    
    constructor(){
        super()
        this.state ={
            redirect:false,
            message:"",
            errors:[]
        }

    }
    
    handleSubmit()
    {
        let valid_email = validateEmail(this.state.email)
        let valid_password = validatePassword(this.state.password)
        if(validateEmail(this.state.email) && validatePassword(this.state.password)){
            Axios.post('http://localhost:8080/login/submit', {email:this.state.email, password:this.state.password})
            .then((response)=>{
                if(response.data.auth == true && response.data.token)
                {
                    userContext.user = response.data.user
                    localStorage.setItem('x-access-token', response.data.token)
                    this.setState({redirect:"/posts"})
                }
                else
                {
                    this.setState({message:response.data.message})
                }
            })
        }
        else{
            this.state.errors.push(valid_email, valid_password)
            this.setState({
                errors:this.state.errors

            })
        }
        
    }
    handleRegisterClick()
    {
        this.setState({
            redirect:"/register"
        })
    }

    render(){
        if(this.state.redirect)
        {
            return(<Redirect to={this.state.redirect}/>)
        }
        if(localStorage.getItem('x-access-token'))
        {
            return(<Redirect to="/posts"/>)

        }
        return(
            <div className="login-form">
                <div className="errors">
                    {
                        this.state.errors.map((error)=>{
                            if(error != ""){
                                return(<p>{error}</p>)
                            }
                        })
                    }
                    </div>
                <p className="response-text">{this.state.message}</p>
                <label for="email">Email:</label>
                <input type="email" name="password" onChange={(e)=>this.setState({state:this.state, email:e.target.value})}/>
                <label for="password">Password:</label>
                <input type="password" name="password" onChange={(e)=>this.setState({state:this.state, password:e.target.value})}/>
                <button type="submit" onClick={(e)=>this.handleSubmit()}>Log In</button>
                <button type="submit" onClick={(e)=>this.handleRegisterClick()}>Register</button>

            </div>
        )

    }
}
