import React from 'react'
import {Redirect} from 'react-router-dom'
import { userContext } from '../contexts/userContext'
import Axios from 'axios'
function getUser(){
    if(localStorage.getItem('x-access-token')){
        Axios.post('/api/auth/decode', {
            token:localStorage.getItem('x-access-token')
        })
        .then((response)=>{
            if(response.data.user){
                console.log(userContext.user)
                userContext.user = response.data.user
                return userContext.user
            }
            else{
                return(<Redirect to="/unauth"/>)
            }
        })
    }
}

export default getUser