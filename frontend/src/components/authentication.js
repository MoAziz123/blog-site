import React from 'react'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'
import getUser from '../contexts/auth'
export default class Authentication extends React.Component
{
    constructor(props){
        super(props)
        this.state={

        }
    }

    componentDidMount(){
        getUser()
    }

    render=()=>{
        if(this.state.redirect){
            return(<Redirect to={this.state.redirect}/>)
        }
        return(<></>)
    }

}