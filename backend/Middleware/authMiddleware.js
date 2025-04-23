const jwt = require('jsonwebtoken');

// ตรวจสอบ token จาก request
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // ดึง token จาก header

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // ตรวจสอบ token
    req.userId = decoded.userId;  // นำ userId ไปใส่ใน request
    next();  // ไปยัง middleware ถัดไป
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticate;
