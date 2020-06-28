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
import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: String, required: true, index: { unique: true } },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  jobTitle: { type: String, required: false },
});

export default mongoose.model('users', userSchema);
