import React from 'react'
import UpdateForm from '../components/update-form'
import {idContext} from '../contexts/idContext'
import NavBar from '../components/nav-bar'

export default class UpdatePage extends React.Component{
    render()
    {
        return(
        <>
        <NavBar/>
        <idContext.Consumer>
            {(value)=> <UpdateForm value={idContext}/>}
        </idContext.Consumer>
        </>)
    }
}