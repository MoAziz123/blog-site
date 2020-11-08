import React from 'react'
import Axios from 'axios'
import NavBar from '../components/nav-bar'

export default class SettingsPage extends React.Component{
    handleChangeDetails=()=>{
        Axios.post('http://localhost:8080/login/update',{
            username:this.state.username,
            password:this.state.password
        }
        .then((res)=>this.setState({message:res.data.message}))
        .catch((error)=>console.error(error)))
    }
    handleDeleteAccount=()=>{
        Axios.post('http://localhost:8080/login/delete',{
            
        })

    }
    handleChangeSiteName=(value)=>{
        localStorage.setItem('site-name', value)

    }
    handleChangeTheme=(theme)=>{
        localStorage.setItem('site-theme', theme)

    }
    render()
    {
        return(<>
        <NavBar/>
        <div className="settings-form">
            <div className="setting">
                <h3>Change account details</h3>
                <div className="setting-description">
                    <p>This allows you to change details of your account.</p>
                </div>
                <label for="email">Email:</label>
                <input type="email" name="email" onChange={(e)=>{this.setState({state:this.state, email:e.target.value})}}/>
                <label for="password">Password:</label>
                <input type="password" name="password" onChange={(e)=>{this.setState({state:this.state, password:e.target.value})}}/>
                <label for="username">Name:</label>
                <input type="text" name="username" onChange={(e)=>{this.setState({state:this.state, name:e.target.value})}}/>
                <button type="submit" onClick={(e)=>this.handleChangeDetails()}>Change</button>
            </div>
            <div className="setting">
                <h3>Delete Account</h3>
                <div className="setting-description">
                  <p>This option allows you to delete your account. To be able to do this, please enter your password below.</p>
                </div>
                <label for="password-confirm">Password:</label>
                <input type="password" name="password-confirm" onChange={(e)=>{this.setState({state:this.state, password_confirm:e.target.value})}}/>
                <button type="submit" onClick={(e)=>this.handleDeleteAccount()}></button>
            </div>
            <div className="setting">
                <h3>Change Theme</h3>
                <div className="setting-description">
                    Click any of the icons below to change your theme, and click save.
                </div>
                <div className="theme-boxes">
                    <div className="theme-box">
                        <img src="/" onClick={(e)=>this.handleChangeTheme()}/>
                    </div>
                </div>
            </div>
            //change username/pass
            //delete account
            //change name of site
            //footer content
            //site theme
            </div>
        </>)
    }
}