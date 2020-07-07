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

const basicsSchema = new Schema({
  _id: Schema.ObjectId,
  name: {
    first: { type: String, required: true },
    middle: { type: String, required: false },
    last: { type: String, required: true },
  },
  occupation: { type: String, required: false },
  company: { type: String, required: false },
  description: { type: String, required: false },
  image: { type: String, required: false },
  bio: { type: String, required: false },
  contactMessage: { type: String, required: false },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  address: {
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zip: { type: String, required: false },
  },
  website: { type: String, required: false },
  resumeDownload: { type: String, required: false },
  social: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true },
      className: { type: String, required: true },
    },
  ],
});

export default mongoose.model('basics', basicsSchema);
