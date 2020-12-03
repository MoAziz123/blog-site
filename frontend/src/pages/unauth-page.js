import React from 'react'
import NavBar from '../components/nav-bar'
function Unauth(){
    return(<p>You are not authenticated</p>)
}

/**
 * @class - UnauthPage
 * @description - page that the user is redirected to when they access a resource that requires authentication
 * @since 1.0.0
 */

 export default class UnauthPage extends React.Component{
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