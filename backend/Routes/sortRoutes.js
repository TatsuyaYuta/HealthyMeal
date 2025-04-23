const express = require('express');
const router = express.Router();
const { sortMenuByPrice } = require('../Controllers/sortControllers')

// POST: เพิ่มข้อมูลโรค
router.get('/sortMenu', sortMenuByPrice); // inprogress


module.exports = router;