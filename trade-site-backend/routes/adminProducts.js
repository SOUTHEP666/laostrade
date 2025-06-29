const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { verifyAdmin } = require('../middleware/auth'); // 解构引入

// 使用 verifyAdmin 中间件，自动校验 token 并判断角色
router.use(verifyAdmin);

// 获取所有商品
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 新增商品
router.post('/', async (req, res) => {
  const { name, description, price, image_url } = req.body;
  if (!name || !price) return res.status(400).json({ message: '名称和价格必填' });

  try {
    await pool.query(
      'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)',
      [name, description || '', price, image_url || '']
    );
    res.json({ message: '商品添加成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 编辑商品
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE products SET name=?, description=?, price=?, image_url=? WHERE id=?',
      [name, description || '', price, image_url || '', id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: '商品不存在' });
    res.json({ message: '商品更新成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 删除商品
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id=?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: '商品不存在' });
    res.json({ message: '商品删除成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router;
