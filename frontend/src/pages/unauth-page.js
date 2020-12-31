import React from 'react'
import NavBar from '../components/nav-bar'
function Unauth(){
    return(
        <>
        <h1>ERROR 403 - UNAUTHORISED</h1>
    <p>You are not authenticated.</p>
    <p>Please log in again.</p>
    </>)
}

/**
 * @class - UnauthPage
 * @description - page that the user is redirected to when they access a resource that requires authentication
 * @since 1.0.0
 */

 export default class UnauthPage extends React.Component{
     componentWillMount(){
         localStorage.removeItem('x-access-token')
     }
     render(){
         return(
            <>
                <NavBar/>
                <div className="main-page">
                    <Unauth/>
                </div>
            </>
         )

     }
 }