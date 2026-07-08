const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const adminRouter = require('./api/admin');
const filesRouter = require('./api/files');
const gatewayRouter = require('./api/gateway');

app.use(express.json());
app.use(express.static('public'));

// WARNING: CORS origin set to wildcard '*'
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Mount routers
app.use('/api/admin', adminRouter);
app.use('/api/files', filesRouter);
app.use('/api/gateway', gatewayRouter);


app.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
