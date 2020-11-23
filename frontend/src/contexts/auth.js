
import { userContext } from '../contexts/userContext'
import Axios from 'axios'
function getUser(){
    if(localStorage.getItem('x-access-token')){
        Axios.post('http://localhost:8080/auth/decode', {
            token:localStorage.getItem('x-access-token')
        })
        .then((response)=>{
            userContext.user = response.data.user
        })
    }
}

export default getUser