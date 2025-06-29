const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../models/userModel');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) return res.status(400).json({ message: '用户已存在' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, hashedPassword);
    res.json({ message: '注册成功' });
  } catch (err) {
    res.status(500).json({ message: '服务器错误' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    console.log('登录查询用户:', user);

    if (!user) return res.status(401).json({ message: '用户名错误' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: '密码错误' });

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET 未配置！');
      return res.status(500).json({ message: '服务器配置错误' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, role: user.role, username: user.username });
  } catch (err) {
    console.error('登录错误:', err);
    res.status(500).json({ message: '服务器错误' });
  }
};

