import Axios from 'axios'
//**tests for blogpost api */
function testGetAll()
{
    
}
function testSearchOne()
{
    Axios.get('http://localhost:8080/searchOne',)
    .then((res)=>{
        console.assert(res.data._id == "")
    })

}

function testDelete()
{

}
function testUpdate(){

}
function testAdd(){

}
function testSearch(){

}

/**tests for comment api */



/**tests for login api */