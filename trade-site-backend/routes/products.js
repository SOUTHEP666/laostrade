const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 获取全部商品
router.get('/products', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM products');
    res.json(results);
  } catch (err) {
    console.error('查询商品失败:', err);
    res.status(500).send('服务器内部错误');
  }
});

// 根据ID获取单个商品详情
router.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [results] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).send('商品未找到');
    }
    res.json(results[0]);
  } catch (err) {
    console.error('查询商品详情失败:', err);
    res.status(500).send('服务器内部错误');
  }
});

module.exports = router;
