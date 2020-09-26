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
