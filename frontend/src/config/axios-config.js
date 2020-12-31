import Axios from 'axios'
import { userContext } from '../contexts/userContext'

const instance = Axios.create({
    baseURL:"http://localhost:8080/",

})
if(localStorage.getItem('x-access-token')){
    instance.defaults.headers.common['x-access-token'] = localStorage.getItem('x-access-token')
}



export default instance