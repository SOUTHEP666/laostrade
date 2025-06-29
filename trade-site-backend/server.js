const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const carRoutes = require('./routes/cars');
const adminProductsRouter = require('./routes/adminProducts');
const landRoutes = require('./routes/lands');
const houseRoutes = require('./routes/houses');



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 路由
app.use('/api', authRoutes);

// cars
app.use('/api/cars', carRoutes);

// products
app.use('/api', productRoutes);

//admin
app.use('/api/admin/products', adminProductsRouter);

// lands
app.use('/api', landRoutes);

// houses
app.use('/api/houses', houseRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
