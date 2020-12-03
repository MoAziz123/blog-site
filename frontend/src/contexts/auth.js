
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
                <Redirect to="/unauthenticated"/>
            }
        })
    }
}

export default getUser