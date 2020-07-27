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
import { v4 as uuidv4 } from 'uuid';

/* eslint-disable */

const resolvers = {
  Query: {
    message: (parent, { id }, { models }) => {
      return messages[id];
    },
    messages: (parent, { id }, { models }) => {
      return Object.values(messages);
    },
  },

  Mutation: {
    createMessage: (parent, { text }, { me, models }) => {
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
    updateMessage: (parent, { id, text }, { me, models }) => {
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
    deleteMessage: (parent, { id }, { models }) => {
      const { [id]: message, ...otherMessages } = messages;

      if (!message) {
        return false;
      }

      messages = otherMessages;

      return true;
    },
  },

  Message: {
    // user: (parent, args, { me }) => {
    //   return me;
    // },
    user: (message, args, { models }) => {
      return users[message.userId];
    },
  },
};

/* eslint-enable */

export default resolvers;
