import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }
`;

export default schema;
