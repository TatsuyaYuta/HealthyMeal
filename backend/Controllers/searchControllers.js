const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function searchMenu(req, res) {
  try {
    const { query, userId } = req.query; // รับ query และ userId จาก query parameters

    if (!query || !userId) {
      return res.status(400).json({ error: 'ต้องระบุคำค้นหาและ userId' });
    }

    // ดึงข้อมูลผู้ใช้
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        healthConditions: true, // ดึงโรคประจำตัวของผู้ใช้
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'ไม่พบผู้ใช้' });
    }

    // ดึงโรคประจำตัวของผู้ใช้
    const userHealthConditions = user.healthConditions.map((hc) => hc.id);

    // ค้นหาอาหารที่ตรงกับคำค้นหาและเหมาะกับโรคประจำตัวของผู้ใช้
    const menus = await prisma.menu.findMany({
      where: {
        name: {
          contains: query,
        },
        suitableFor: {
          some: {
            id: {
              in: userHealthConditions,
            },
          },
        },
      },
      include: {
        restaurant: true,
        category: true,
        nutrition: true,
        suitableFor: true,
      },
    });

    res.status(200).json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการค้นหาอาหาร' });
  }
}

module.exports = { searchMenu };