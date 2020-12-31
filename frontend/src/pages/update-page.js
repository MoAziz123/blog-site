import React from 'react'
import DynamicForm from '../components/dynamic-form'
import {idContext} from '../contexts/idContext'
import NavBar from '../components/nav-bar'

export default class UpdatePage extends React.Component{
    render()
    {
        if(localStorage.getItem('x-access-token'))
        return(
        <>
        <NavBar/>
        <idContext.Consumer>
            {(value)=> <DynamicForm handler="update" value={idContext}/>}
        </idContext.Consumer>
        </>)
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