import React from 'react'
import { idContext } from '../contexts/idContext'
import { userContext } from '../contexts/userContext'
import Settings from '../components/settings'
import NavBar from '../components/nav-bar'
export default class SettingsPage extends React.Component{
 
    render=()=>{
        return(
            <>
            <NavBar/>
            <div className="main-page">
            <userContext.Provider>
                <idContext.Provider>
                    <Settings/>
                </idContext.Provider>
            </userContext.Provider>
            </div>
            </>
        )
    }
}