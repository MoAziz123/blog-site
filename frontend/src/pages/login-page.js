import React from 'react'
import Axios from 'axios'
import LogInForm from '../components/login-form'
import {userContext} from '../contexts/userContext'
import NavBar from '../components/nav-bar'

export default class LogInPage extends React.Component{
    
    render(){
       return(
           <>
            <NavBar/>
       <userContext.Consumer>
            {(value)=>(<LogInForm user={value}/>)}
        </userContext.Consumer>
        </>
       )
    }
}