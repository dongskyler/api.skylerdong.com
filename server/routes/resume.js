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
import path from 'path';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      '..',
      '..',
      'documents',
      'resumes',
      'DONG_tiannong_skyler_resume.pdf'
    )
  );
});

export default router;
