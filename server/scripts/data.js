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
require('dotenv').config();
const { MongoClient } = require('mongodb');
const faker = require('faker');

const generateUsers = async () => {
  const users = [];

  for (let id = 1; id <= 100; id += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const userName = faker.internet.userName();
    const email = faker.internet.email();
    const jobTitle = faker.name.jobTitle();

    users.push({
      id,
      firstName,
      lastName,
      userName,
      email,
      jobTitle,
    });
  }

  try {
    const dbConn = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}?retryWrites=true&w=majority`,
      {
        ssl: true,
        connectTimeoutMS: 3000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const col = dbConn.db('test').collection('users');
    await col.insertMany(users);
    await dbConn.close();
  } catch (error) {
    throw new Error(error);
  }
};

generateUsers();
