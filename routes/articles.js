const express = require('express');
const Article = require('../models/Article');
const router = express.Router();

router.post('/add', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const article = new Article({ title, content, author });
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
