const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const usersRouter = require('./api/users');
const passwordResetRouter = require('./api/password-reset');

app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', usersRouter);
app.use('/api/password-reset', passwordResetRouter);

app.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
