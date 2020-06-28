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
import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
    message(id: ID!): Message!
    messages: [Message!]!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    updateMessage(id: ID!, text: String!): Boolean!
    deleteMessage(id: ID!): Boolean!
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

export default schema;
