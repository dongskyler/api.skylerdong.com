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

import 'regenerator-runtime/runtime';
import Basics from '../models/basics';

/* eslint-disable */

const resolvers = {
  Query: {
    basics: async (parent, { id }) => {
      const basics = await Basics.find(id).lean();

      return basics;
    },
  },
};

/* eslint-enable */

export default resolvers;
