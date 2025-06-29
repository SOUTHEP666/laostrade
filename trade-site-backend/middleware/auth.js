// middleware/auth.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: '无 token，拒绝访问' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 例如 { id: 1, role: 'admin' }
    next();
  } catch (err) {
    res.status(403).json({ message: 'token 无效' });
  }
}

// 只允许管理员访问
function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: '管理员权限不足' });
    }
    next();
  });
}

module.exports = {
  verifyToken,
  verifyAdmin
};
