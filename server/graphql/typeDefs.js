import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    jobTitle: String
  }

  type UsersResult {
    users: [User]
    currentPage: Int
    totalPages: Int
  }

  type Query {
    getUsers(search: String, page: Int, limit: Int): UsersResult
  }
`;

export default typeDefs;
