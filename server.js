const express = require('express');
const path = require('path');
const { initializeDatabase } = require('./database/db');
const partsRoutes = require('./api/parts');
const ordersRoutes = require('./api/orders');
const suppliersRoutes = require('./api/suppliers');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API routes
const apiRoutes = express.Router();
apiRoutes.use('/parts', partsRoutes);
apiRoutes.use('/orders', ordersRoutes);
apiRoutes.use('/suppliers', suppliersRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});













