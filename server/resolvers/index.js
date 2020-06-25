// import userResolvers from './user';
// import messageResolvers from './message';

// export default [userResolvers, messageResolvers];

import 'regenerator-runtime/runtime';
import Basics from '../models/basics';

const resolvers = {
  Query: {
    basics: async (parent, { id }) => {
      const basics = await Basics.find(id).lean();

      return basics;
    },
  },
};

export default resolvers;
