import React from 'react'
/**@context - userContext
 * @description - used to provide user details to all forms that require it
 * 
 */
const userContext = React.createContext({user:{access:0}})
export {userContext}