import React from 'react'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'
import {userContext} from '../contexts/userContext'
export default class Authentication extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            redirect:""

        }
    }

    componentWillMount(){
        console.log("hi")
        if(localStorage.getItem('x-access-token')){
            Axios.post('/api/auth/decode', {
                token:localStorage.getItem('x-access-token')}, {headers:{'x-access-token':localStorage.getItem('x-access-token')}}
            )
            .then((response)=>{
                if(response.data.user && response.data.auth){
                    console.log(userContext.user)
                    userContext.user = response.data.user
                    return userContext.user
                }
                else{
                    this.setState({redirect:"/unauth"})
                }
            })
        }
    }

    render=()=>{
        if(this.state.redirect){
            return(<Redirect to={this.state.redirect}/>)
        }
        return(<></>)
    }

}