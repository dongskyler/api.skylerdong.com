import express from 'express';
// import path from 'path';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('respond with some information');
});

export default router;
