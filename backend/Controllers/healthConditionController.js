const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST: เพิ่มข้อมูลโรค
exports.addHealthCondition = async (req, res) => {
  const { name } = req.body; // รับชื่อโรคจากผู้ใช้

  if (!name) {
    return res.status(400).json({ error: 'Missing required fields: name' });
  }

  try {
    const newHealthCondition = await prisma.healthCondition.create({
      data: { name },
    });

    res.status(201).json({ message: 'Health condition added successfully', healthCondition: newHealthCondition });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
