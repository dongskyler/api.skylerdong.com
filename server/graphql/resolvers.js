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
import Users from '../models/users';

const resolvers = {
  Query: {
    getUsers: async (_, args) => {
      // destrcture search, page, limit, and set default values
      const { search = null, page = 1, limit = 20 } = args;

      let searchQuery = {};

      // run if search is provided
      if (search) {
        // update the search query
        searchQuery = {
          $or: [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { userName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { jobTitle: { $regex: search, $options: 'i' } },
          ],
        };
      }

      // execute query to search users
      const users = await Users.find(searchQuery)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean();

      // get total documents
      const count = await Users.countDocuments(searchQuery);

      return {
        users,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    },
  },
};

export default resolvers;
