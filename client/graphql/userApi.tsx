// import { ListParams, ListResponse, Student } from 'models';
import graphQLClient from '.';
import { gql } from 'graphql-request'

const useUserApi = {
  async index(): Promise<any> {
    const query = gql`
      {
        allUsers {
          id
          name
          email
          admin
          createdAt
          updatedAt
          microposts {
            id
            content
            createdAt
            updatedAt
            postedBy{
              id
              name
              createdAt
              updatedAt
            }
          }
        }
      }
    `
    return await graphQLClient.request(query);
  },
};

export default useUserApi;
