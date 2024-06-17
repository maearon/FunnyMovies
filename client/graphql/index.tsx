import { GraphQLClient, gql } from 'graphql-request'

let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3001/graphql'
} else {
  BASE_URL = 'https://railstutorialapi.onrender.com/graphql'
}

// let token = ''
// if (
//   localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined'
// ) 
// {
//   token = `Bearer ${localStorage.getItem('token')} ${localStorage.getItem('remember_token')}`
// }
// else if (
//   sessionStorage.getItem('token') && sessionStorage.getItem('token') !== 'undefined'
// ) 
// {
//   token = `Bearer ${sessionStorage.getItem('token')} ${sessionStorage.getItem('remember_token')}`
// }

const graphQLClient = new GraphQLClient(BASE_URL, {
  headers: {
    Authorization: '',
  },
})

export default graphQLClient;
