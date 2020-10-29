import React from 'react'
import UpdateForm from '../components/update-form'
import {idContext} from '../contexts/idContext'
export default class UpdatePage extends React.Component{
    render()
    {
        return(<idContext.Consumer>
            {(value)=> <UpdateForm value={idContext}/>}
        </idContext.Consumer>)
    }
}