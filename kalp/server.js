const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const gatewayRouter = require('./api/gateway');

app.use(express.json());
app.use(express.static('public'));

app.use('/api/gateway', gatewayRouter);

app.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
