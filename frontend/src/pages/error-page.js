import React from 'react'
import NavBar from '../components/nav-bar'
import Error from '../components/error'
/**
 * @class - ErrorPage
 * @description - shows an error if a user navigates to the wrong page
 * @since 1.0.0
 */
export default class ErrorPage extends React.Component{
 
    render=()=>{
        
        return(
        <>
        <NavBar/>
        <div className="main-page">
            <Error/>
        </div>
        </>
        )
    }
}