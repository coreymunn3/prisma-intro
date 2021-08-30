const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      posts: true,
    },
  });

  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const { username } = req.body;
  const userExists = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
    },
  });

  if (userExists) {
    res.status(400).json({ message: 'User Already Exists!' });
  }
  // create the user
  const newUser = await prisma.user.create({
    data: { username },
  });
  res.status(200).json(newUser);
});

module.exports = router;
