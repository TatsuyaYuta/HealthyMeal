const express = require('express');
const router = express.Router();
const {searchMenu} = require('../Controllers/searchControllers')

// POST: เพิ่มข้อมูลโรค
router.get('/searchMenu', searchMenu); // done

module.exports = router;