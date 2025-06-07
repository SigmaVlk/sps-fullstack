const express = require('express');
const app = express();
const port = 3000;

const partsRoutes = require('./api/parts');
const suppliersRoutes = require('./api/suppliers');
const ordersRoutes = require('./api/orders');

app.use(express.json());
app.use(express.static('public'));

app.use('/api/parts', partsRoutes);
app.use('/api/suppliers', suppliersRoutes);
app.use('/api/orders', ordersRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
