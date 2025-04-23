const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function sortMenuByPrice(req, res) {
  try {
    const { sort, userId } = req.query; // รับ sort และ userId จาก query parameters

    if (!userId) {
      return res.status(400).json({ error: "ต้องระบุ userId" });
    }

    let orderBy = {};

    if (sort === "asc") {
      orderBy = { price: "asc" };
    } else if (sort === "desc") {
      orderBy = { price: "desc" };
    } else {
      return res
        .status(400)
        .json({ error: 'ต้องระบุ parameter sort เป็น "asc" หรือ "desc"' });
    }

    // ดึงข้อมูลเมนูจากตาราง Menu โดยอิงจาก userId
    const menus = await prisma.menu.findMany({
      where: {
        cartItems: {
          some: {
            userId: parseInt(userId),
          },
        },
      },
      orderBy: orderBy,
      include: {
        restaurant: true,
        category: true,
        nutrition: true,
        suitableFor: true,
        cartItems: true,
      },
    });

    res.status(200).json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเรียงลำดับอาหาร" });
  }
}

module.exports = { sortMenuByPrice };