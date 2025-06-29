const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 获取所有车辆
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cars ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 根据ID获取车辆详情
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cars WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: '车辆未找到' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 新增车辆
router.post('/', async (req, res) => {
  try {
    const { title, brand, model, year, mileage, price, description, image_url } = req.body;
    const sql = `INSERT INTO cars (title, brand, model, year, mileage, price, description, image_url created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
    const [result] = await db.query(sql, [title, brand, model, year, mileage, price, description, image_url, title]);
    res.json({ id: result.insertId, message: '新增成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 修改车辆
router.put('/:id', async (req, res) => {
  try {
    const { title, brand, model, year, mileage, price, description, image_url,} = req.body;
    const sql = `UPDATE cars SET title = ?, brand = ?, model = ?, year = ?, mileage = ?, price = ?, description = ?, image_url = ?, title = ? WHERE id = ?`;
    const [result] = await db.query(sql, [title, brand, model, year, mileage, price, description, image_url, title, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '车辆未找到' });
    }
    res.json({ message: '修改成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 删除车辆
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM cars WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '车辆未找到' });
    }
    res.json({ message: '删除成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '服务器错误' });
  }
});

module.exports = router;
