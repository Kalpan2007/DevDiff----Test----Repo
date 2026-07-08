const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const searchRouter = require('./api/search');

app.use(express.json());
app.use(express.static('public'));

app.use('/api/search', searchRouter);

app.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
