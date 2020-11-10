import React from 'react'
import Axios from 'axios'
import NavBar from '../components/nav-bar'
import {userContext} from '../contexts/userContext'
import {Redirect} from 'react-router-dom'
import hash from 'crypto-js/sha256'

export default class SettingsPage extends React.Component{
    constructor(props)
    {
        super(props)
        this.state ={
            user:null,
            redirect:"",
            name: userContext.user.name,
            email:userContext.user.email
        }
    }
    componentDidMount()
    {
        Axios.post('http://localhost:8080/login/search', {id:userContext.user.id})
        .then((res)=>this.setState({user:res.data.user}))
    }
    handleChangeDetails(){
        Axios.put('http://localhost:8080/login/update',{
            id:userContext.user.id,
            username:this.state.name,
            password:this.state.password,
            email:this.state.email

        })
        .then((res)=>{
            if(res.data.success){
                userContext.user = res.data.user
                this.setState({message:res.data.message})
            }
        })
        .catch((error)=>console.error(error))
    }
    handleDeleteAccount=()=>{
        Axios.post('http://localhost:8080/login/search', {id:userContext.user.id})
        .then((res)=>{
            if(hash(this.state.password_confirm) == res.data.user.password){
                Axios.post('http://localhost:8080/login/delete',{
                    id:userContext.user.id
                })
                .then((res)=>{
                    this.setState({redirect:"/login"})
                })
            }
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
        if(this.state.redirect)
        {
            return <Redirect to={this.state.redirect}/>
        }
        return(<>
        <NavBar/>
        <div className="settings-form">
            <div className="setting">
                <h3>Change account details</h3>
                <div className="setting-description">
                    <p>This allows you to change details of your account.</p>
                </div>
                <br/>
                <label for="username">Name:</label>
                <input type="text" name="username" value={this.state.name} onChange={(e)=>{this.setState({state:this.state, name:e.target.value})}}/>
                <br/>
                <label for="email">Email:</label>
                <input type="email" name="email" value={this.state.email} onChange={(e)=>{this.setState({state:this.state, email:e.target.value})}}/>
                <br/>
                <label for="password">Password:</label>
                <input type="password" name="password" value={this.state.user.password} onChange={(e)=>{this.setState({state:this.state, password:e.target.value})}}/>
                <br/>
                
                
                <button type="submit" onClick={(e)=>this.handleChangeDetails()}>Change</button>
                <br/>

            </div>
            <div className="setting">
                <h3>Delete Account</h3>
                <div className="setting-description">
                  <p>This option allows you to delete your account. To be able to do this, please enter your password below.</p>
                </div>
                <br/>

                <label for="password-confirm">Password:</label>
                <input type="password" name="password-confirm" onChange={(e)=>{this.setState({state:this.state, password_confirm:e.target.value})}}/>
                <br/>
                
                <button type="submit" onClick={(e)=>this.handleDeleteAccount()}>Delete</button>
                <br/>
            
            </div>
            <div className="setting">
                <h3>Change Site Name</h3>
                <div className="setting-description">
                    <p>Input a new name for the site.</p>
                </div>
                <label for="site_name_change">Site Name:</label>
                <input type="text" name="site_name_change" value={localStorage.getItem('site-name')} onChange={(e)=>this.setState({state:this.state, site_name:e.target.value})}/>
                <button type="submit" onClick={(e)=>this.handleChangeSiteName()}>Change Name</button>
            </div>
            <div className="setting">
                <h3>Change Theme</h3>
                <div className="setting-description">
                    Click any of the icons below to change your theme, and click save.
                </div>
                <br/>

                <div className="theme-boxes">
                    <div className="theme-box" onClick={(e)=>this.handleChangeTheme()}>
                        <img src="/" />
                    </div>
                </div>
                <br/>

            </div>
            </div>
        </>)
    }
}