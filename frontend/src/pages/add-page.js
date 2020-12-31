import React from 'react'
import DynamicForm from '../components/dynamic-form'
import NavBar from '../components/nav-bar'
import getUser from '../contexts/auth'
import {userContext} from '../contexts/userContext'


/**@class - AddPage
 * @description - used to add posts via dynamic form 
 */
export default class AddPage extends React.Component
{
    constructor(props){
        super(props)
        
    }
    componentWillMount(){
        getUser()
    }
        
    render=()=>{
        if(localStorage.getItem('x-access-token'))
        return(
            <>
            <NavBar/>
        <userContext.Consumer>
            {(value)=>(<DynamicForm handler="add" value={value}/>)}
        </userContext.Consumer>
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