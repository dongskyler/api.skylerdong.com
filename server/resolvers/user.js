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

/* eslint-disable */

const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      return me;
    },
    user: (parent, { id }, { models }) => {
      return users[id];
    },
    users: (parent, args, { models }) => {
      return Object.values(users);
    },
  },

  User: {
    messages: (user, args, { models }) => {
      return Object.values(messages).filter((message) => message.userId === user.id);
    },
  },
};

/* eslint-enable */

export default resolvers;
