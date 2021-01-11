import React from 'react'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'
import hash from 'crypto-js/md5'
import {validateEmail, validatePassword, validateName} from './validation'
/**@class - RegisterForm
 * @description - the form for users to submit login/password
 * @since 1.0.0/
 */
export default class RegisterForm extends React.Component{
    
    constructor(){
        super()
        this.state ={
            redirect:false,
            message: "",
            errors:[]
        }

    }
    handleSubmit()
    {
        this.state.errors = []
        this.state.message = ""
        let valid_email = validateEmail(this.state.email)
        let valid_password = validatePassword(this.state.password)
        let valid_name = validateName(this.state.name)
        if(validateName(this.state.name)  == "" && validateEmail(this.state.email) == "" && validatePassword(this.state.password) == ""){
            Axios.post('/api/login/register', {email:this.state.email, password:hash(this.state.password).toString(), name:this.state.name})
            .then((response)=>{
                this.setState({message:response.data.message})
                
            })
        }
        else{
            this.state.errors.push(valid_name, valid_email, valid_password)
            this.setState({
                errors:this.state.errors

            })
        }
    }

    render(){
        if(this.state.redirect)
        {
            return(<Redirect to={this.state.redirect}/>)
        }
        return(
            <div className="login-form">
                <p className="response-text">{this.state.message}</p>
                <div className="errors">
                    {
                        this.state.errors.map((error)=>{
                            if(error != ""){
                                return(<p>{error}</p>)
                            }
                        })
                    }
                    </div>
                <div className="login-element">
                <label for="name">Name:</label>
                <br/>
                <input type="text" name="name" onChange={(e)=>this.setState({state:this.state, name:e.target.value})}/> 
                </div>
              
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

                <button type="submit" onClick={(e)=>this.handleSubmit()}>Register</button>
            </div>
        )

    }
}