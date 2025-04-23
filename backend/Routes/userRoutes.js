const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile , updateUser , deleteUser } = require('../Controllers/userController');
const authenticate = require('../Middleware/authMiddleware');  // เพิ่ม middleware

// เส้นทางสำหรับสมัครสมาชิกและเข้าสู่ระบบ
router.post('/users/register', registerUser); // done
router.post('/users/login', loginUser); // done
router.put('/users/updateUser' , updateUser); // done
router.delete('/users/me', authenticate, deleteUser); // done


// เส้นทางสำหรับดูข้อมูลตัวเอง (ต้องการการตรวจสอบ token)
router.get('/users/me', authenticate, getUserProfile);  // เพิ่มการตรวจสอบ token

module.exports = router;
