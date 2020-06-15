import express from 'express';
const router = express.Router();
import path from 'path';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

// module.exports = router;

export default router;
