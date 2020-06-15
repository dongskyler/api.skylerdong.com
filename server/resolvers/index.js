import { v4 as uuidv4 } from 'uuid';

const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      return me;
    },
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
    messages: () => {
      return Object.values(messages);
    },
  },

  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };

      messages[id] = message;
      users[me.id].messageIds.push(id);

      return message;
    },
    updateMessage: (parent, { id, text }, { me }) => {
      if (!id || !text) {
        return false;
      }

      const message = {
        id,
        text,
        userId: me.id,
      };

      messages[id] = message;

      return true;
    },
    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...otherMessages } = messages;

      if (!message) {
        return false;
      }

      messages = otherMessages;

      return true;
    },
  },

  User: {
    messages: user => {
      return Object.values(messages).filter(
        message => message.userId === user.id
      )
    },
  },

  Message: {
    // user: (parent, args, { me }) => {
    //   return me;
    // },
    user: message => {
      return users[message.userId];
    }
  },
};

export default resolvers;
