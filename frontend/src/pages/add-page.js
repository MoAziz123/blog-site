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
    constructor(){
        super()
        
    }
        
    render=()=>{
        return(
            <>
            <NavBar/>
        <userContext.Consumer>
            {(value)=>(<DynamicForm handler="add" value={value}/>)}
        </userContext.Consumer>
        </>
        )
    }
    
}