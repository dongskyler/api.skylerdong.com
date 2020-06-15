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
