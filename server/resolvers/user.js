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
