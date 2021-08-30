const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the App' });
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
