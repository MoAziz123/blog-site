import Axios from 'axios'
import { userContext } from '../contexts/userContext'

const instance = Axios.create({
    baseURL:"http://localhost:8080/",

})
if(localStorage.getItem('x-access-token')){
    instance.defaults.headers.common['x-access-token'] = localStorage.getItem('x-access-token')
}

instance.interceptors.response.use(response=>{
    if(response.data.decoded){
        let user = {
            name:response.data.decoded.payload.name,
            id:response.data.decoded.payload.id,
            email:response.data.decoded.payload.email

        }
        response.data.user = user

    }
    return response

})

export default instance