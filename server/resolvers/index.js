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
