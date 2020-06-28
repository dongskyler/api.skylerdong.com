/**
 * @summary Back-end API for my personal websites.
 * @author Skyler Dong <skyler@skylerdong.com>
 * @copyright 2020 Skyler Dong
 * @version 0.0.0
 *
 * Back-end API for my websites, built with Node, Express,
 * Apollo Server, GraphQL, MongoDB Atlas and ElasticSearch
 *
 */
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
