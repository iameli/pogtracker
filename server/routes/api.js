import express from 'express';
const router = express.Router();

router.get('/',(req, res) => {
  res.json({message: 'What can I do for you?'})
});

export default router;

