const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// 获取全部土地列表（无需权限）
router.get('/lands', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM lands');
    res.json(results);
  } catch (err) {
    console.error('查询土地失败:', err);
    res.status(500).send('服务器内部错误');
  }
});

// 获取单个土地详情（无需权限）
router.get('/lands/:id', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM lands WHERE id = ?', [req.params.id]);
    if (results.length === 0) return res.status(404).json({ message: '未找到该土地' });
    res.json(results[0]);
  } catch (err) {
    console.error('查询土地详情失败:', err);
    res.status(500).send('服务器内部错误');
  }
});

// 新增土地（管理员权限）
router.post('/lands', verifyAdmin, async (req, res) => {
  const { title, description, price, location, area, image_url } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO lands (title, description, price, location, area, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, price, location, area, image_url]
    );
    res.json({ id: result.insertId, message: '新增成功' });
  } catch (err) {
    console.error('新增土地失败:', err);
    res.status(500).send('服务器内部错误');
  }
});

// 编辑土地（管理员权限）
router.put('/lands/:id', verifyAdmin, async (req, res) => {
  const { title, description, price, location, area, image_url } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE lands SET title=?, description=?, price=?, location=?, area=?, image_url=? WHERE id=?',
      [title, description, price, location, area, image_url, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: '未找到该土地' });
    res.json({ message: '更新成功' });
  } catch (err) {
    console.error('更新土地失败:', err);
    res.status(500).send('服务器内部错误');
  }
});

// 删除土地（管理员权限）
router.delete('/lands/:id', verifyAdmin, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM lands WHERE id=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: '未找到该土地' });
    res.json({ message: '删除成功' });
  } catch (err) {
    console.error('删除土地失败:', err);
    res.status(500).send('服务器内部错误');
  }
});

module.exports = router;
