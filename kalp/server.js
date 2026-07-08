const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const adminRouter = require('./api/admin');

app.use(express.json());
app.use(express.static('public'));

// WARNING: CORS origin set to wildcard '*'
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// WARNING: No rate limit configured on this or login endpoints
app.use('/api/admin', adminRouter);

app.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
