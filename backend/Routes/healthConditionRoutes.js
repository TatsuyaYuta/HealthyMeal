const express = require('express');
const router = express.Router();
const { addHealthCondition } = require('../Controllers/healthConditionController');

// POST: เพิ่มข้อมูลโรค
router.post('/healthConditions', addHealthCondition); // done

module.exports = router;