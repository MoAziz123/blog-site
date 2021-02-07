import React from 'react'
import Axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import {userContext} from '../contexts/userContext'
import { validateEmail, validatePassword } from './validation'
import hash from 'crypto-js/md5'
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
            Axios.post('/api/login/submit', {email:this.state.email, password:hash(this.state.password).toString()})
            .then((response)=>{
                if(response.data.auth == true && response.data.token)
                {
                    userContext.user = response.data.user
                    localStorage.setItem('x-access-token', response.data.token)
                    this.setState({redirect:"/"})
                }
                else
                {
                    this.setState({message:response.data.message})
                }
            })
        
        
        
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
             
                <p className="response-text">{this.state.message}</p>
                <div className="login-element">
                <label for="email">Email:</label>
                <br/>
                <input type="email" name="password" onChange={(e)=>this.setState({state:this.state, email:e.target.value})}/>
                
                </div>

                <div className="login-element">
                <label for="password">Password:</label>
                <br/>
                <input type="password" name="password" onChange={(e)=>this.setState({state:this.state, password:e.target.value})}/>
               
                </div>
                <Link to="/forget">Forgot Password?</Link>
                <div className="login-buttons">
                <button type="submit" onClick={(e)=>this.handleSubmit()}>Log In</button>
                <button type="submit" onClick={(e)=>this.handleRegisterClick()}>Register</button>

                </div>
              
            </div>
        )

    }
}
