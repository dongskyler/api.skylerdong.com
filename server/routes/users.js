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
import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

export default router;
