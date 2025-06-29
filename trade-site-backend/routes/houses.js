// routes/houses.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// 获取所有房产
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM houses');
    res.json(rows);
  } catch (err) {
    console.error('获取房产失败:', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 根据ID获取房产详情
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM houses WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '房产未找到' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('获取房产详情失败:', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 新增房产（仅管理员）
router.post('/', verifyAdmin, async (req, res) => {
  const { title, address, area, price, description, image_url } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO houses (title, address, area, price, description, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [title, address, area, price, description, image_url]
    );
    res.json({ message: '房产添加成功', id: result.insertId });
  } catch (err) {
    console.error('新增房产失败:', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 编辑房产（仅管理员）
router.put('/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, address, area, price, description, image_url } = req.body;

  try {
    await pool.query(
      'UPDATE houses SET title = ?, address = ?, area = ?, price = ?, description = ?, image_url = ? WHERE id = ?',
      [title, address, area, price, description, image_url, id]
    );
    res.json({ message: '房产更新成功' });
  } catch (err) {
    console.error('更新房产失败:', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 删除房产（仅管理员）
router.delete('/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM houses WHERE id = ?', [id]);
    res.json({ message: '房产删除成功' });
  } catch (err) {
    console.error('删除房产失败:', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router;
