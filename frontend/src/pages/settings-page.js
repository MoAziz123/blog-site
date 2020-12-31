import React from 'react'
import { idContext } from '../contexts/idContext'
import { userContext } from '../contexts/userContext'
import Settings from '../components/settings'
import NavBar from '../components/nav-bar'
export default class SettingsPage extends React.Component{
 
    render=()=>{
        if(localStorage.getItem('x-access-token'))
        return(
            <>
            <NavBar/>
            <div className="main-page">
            <div className="header-section">
                <h1>SETTINGS</h1>
            </div>
            <userContext.Provider>
                <idContext.Provider>
                    <Settings/>
                </idContext.Provider>
            </userContext.Provider>
            </div>
            </>
        )
        else{
            return(
                <>
                <NavBar/>
                <div className="main-page">
                    <h1>Error 403 - Unauthorised</h1>
                    <p>You are not authorised. Please log in.</p>
                </div>
                </>
            )
        }
    }
}