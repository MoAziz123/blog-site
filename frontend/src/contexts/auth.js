import React from 'react'
import {Redirect} from 'react-router-dom'
import { userContext } from '../contexts/userContext'
import Axios from 'axios'
function getUser(){
    if(localStorage.getItem('x-access-token')){
        Axios.post('http://localhost:8080/auth/decode', {
            token:localStorage.getItem('x-access-token')
        })
        .then((response)=>{
            if(response.data.user){
                userContext.user = response.data.user

            }
            else{
                return(<Redirect to="/unauth"/>)
            }
        })
    }
}

export default getUser