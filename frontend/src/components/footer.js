import React from 'react'

/**@class - Footer
 * @description - contains the footer for the application
 * @style - dark in bg, colour white
 */
export default class Footer extends React.Component
{

    render=()=>{
        return(<div className="footer">
            <div className="footer-wrapper">
                <div className="footer-col">
                    <h1>Other fun stuff</h1>
                    <ul>
                        <li>Portfolio</li>
                        <li></li>
                    </ul>
                
                </div>
                
            </div>
        </div>)
    }
    
}