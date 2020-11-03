import React from 'react'
import RegisterForm from '../components/register-form'
import NavBar from './components/nav-bar'

export default class RegisterPage extends React.Component{
    render()
    {
        return(<>
        <NavBar/>
        <RegisterForm/>
        </>)
    }
    
}