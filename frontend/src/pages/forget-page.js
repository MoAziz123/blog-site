import React from 'react'
import Axios from 'axios'
import NavBar from '../components/nav-bar'
import ForgetPassword from '../components/forget-password'

/**
 * @class - ForgetPage
 * @description - page container for ForgetPassword
 * @since 1.2.0
 */

 export default class ForgetPage extends React.Component{
     render(){
         return(
         <>
         <NavBar/>
         <div className="main-page">
             <div className="header-section">
                 <h1>Reset Password</h1>
             </div>
             <ForgetPassword/>
         </div>

         </>
         )
     }
 }