import React from 'react'
import Axios from 'axios'
/**@class-SearchPage
 * @description - allows users to search for blog posts
 * @since - 1.0.0.
 */
export default class SearchPage extends React.Component{

    constructor()
    {

    }

    handleSearch(query)
    {
        Axios.get('blog/search', {search:query})
        .then((posts)=>{
            this.setState({posts:posts})
        })
    }
    

}