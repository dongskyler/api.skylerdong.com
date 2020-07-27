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
