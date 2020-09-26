import { gql } from 'apollo-server-express';

const basicsSchema = gql`
  type Basics {
    _id: ID!
    name: {
      first: String!
      middle: String
      last: String!
    }
    occupation: String
    company: String
    description: String
    image: String
    bio: String
    contactMessage: String
    email: String!
    phone: String
    address: {
      street: String
      city: String
      state: String
      zip: String
    }
    website: String
    resumeDownload: String
    social: [Social!]
  }

  type Social {
    name: String!
    url: String!
    className: String!
  }

  type Query {
    getBasics(search: String): Basics
  }
`;

export default basicsSchema;
