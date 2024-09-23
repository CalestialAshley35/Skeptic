const express = require('express');
const Space = require('../models/Space');
const Article = require('../models/Article');
const router = express.Router();

router.post('/create', async (req, res) => {
  const { name, description } = req.body;
  try {
    const space = new Space({ name, description });
    await space.save();
    res.json(space);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:spaceId/articles', async (req, res) => {
  const { spaceId } = req.params;
  const { title, content, author } = req.body;

  try {
    const space = await Space.findById(spaceId);
    if (!space) return res.status(404).json({ message: 'Space not found' });

    const article = new Article({ title, content, author });
    await article.save();

    space.articles.push(article);
    await space.save();

    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
