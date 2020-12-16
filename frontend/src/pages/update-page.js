import React from 'react'
import DynamicForm from '../components/dynamic-form'
import {idContext} from '../contexts/idContext'
import NavBar from '../components/nav-bar'

export default class UpdatePage extends React.Component{
    render()
    {
        return(
        <>
        <NavBar/>
        <idContext.Consumer>
            {(value)=> <DynamicForm handler="update" value={idContext}/>}
        </idContext.Consumer>
        </>)
    }
}