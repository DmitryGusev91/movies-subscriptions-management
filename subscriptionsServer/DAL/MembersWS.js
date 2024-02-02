const axios = require('axios');

const url='https://jsonplaceholder.typicode.com/users';

const getAllMembers=()=>{
 return axios.get(url);
}

module.exports={getAllMembers};