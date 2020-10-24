import React from 'react'
import Axios from 'axios'

/**@class - LogInForm
 * @description - the form for users to submit login/password
 * @since 1.0.0/
 */
export default class LogInForm extends React.Component{
    
    constructor(){
        super()

    }
    handleSubmit()
    {
        Axios.post('http://localhost:8080/login/submit', (req,res)=>{
            
        })
    }

    render(){

        return(
            <div className="login-form">
                <input type="email" name="password"/>
                <input type="password" name="password"/>
                <button type="submit" onClick={(e)=>this.handleSubmit()}>Log In</button>
            </div>
        )

    }
}