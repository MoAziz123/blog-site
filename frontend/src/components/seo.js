import React from 'react'

/**
 * @class - SEO
 * @description - SEO component
 * @since 1.0.0
 **/

 export default class extends React.Component{

    constructor(props){
        super(props)
    }
    render=()=>{
        return(
            <>
            <a rel="nofollow"></a>
            <link rel="canonical"/>
            <meta name="author" content="Mo Aziz"/>
            <meta name="keywords" content="Blog"/>`
            <meta name="description" content="A programming blogsite"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </>
        )
    }

 }