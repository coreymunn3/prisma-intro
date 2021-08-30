const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { title, content, user_id } = req.body;

  // make sure user exists
  const userExists = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!userExists) {
    return res.status(400).json({ message: 'User Not Found' });
  }

  const newPost = await prisma.post.create({
    data: {
      title: title,
      post: content,
      user_id: user_id,
    },
  });

  res.status(200).json(newPost);
});

router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const posts = await prisma.post.findMany({
    where: {
      user_id: parseInt(user_id),
    },
    select: {
      title: true,
      post: true,
      created_at: true,
      user: true,
    },
  });

  res.status(200).json(posts);
});

module.exports = router;
