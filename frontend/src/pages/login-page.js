import React from 'react'
import Axios from 'axios'
import LogInForm from '../components/login-form'
import {userContext} from '../contexts/userContext'
export default class LogInPage extends React.Component{
    
    render(){
       return( <userContext.Consumer>
            {(value)=>(<LogInForm user={value}/>)}
        </userContext.Consumer>
       )
    }
}