import React from 'react'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'
import {userContext} from '../contexts/userContext'
/**@class - LogInForm
 * @description - the form for users to submit login/password
 * @since 1.0.0/
 */
export default class LogInForm extends React.Component{
    
    constructor(){
        super()
        this.state ={
            redirect:false
        }

    }
    componentDidMount()
    {
        let item = localStorage.getItem('x-access-token')
        if(item)
        {

        }
    }
    handleSubmit()
    {
        Axios.post('http://localhost:8080/login/submit', {email:this.state.email, password:this.state.password})
        .then((response)=>{
            if(response.data.auth == true && response.data.token)
            {
                userContext.user = response.data.user
                localStorage.setItem('x-access-token', response.data.token)
                this.setState({redirect:"/"})
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
        if(userContext.user)
        {
            return(<Redirect to="/"/>)

        }
        return(
            <div className="login-form">
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
