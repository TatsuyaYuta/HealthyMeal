const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// เพิ่มเมนู (POST)
async function addMenu(req, res) {
  try {
    const {
      name,
      description,
      price,
      restaurantId,
      categoryId,
      nutrition,
      suitableFor
    } = req.body;

    const image = req.file ? req.file.path : null;

    // แปลง suitableFor จาก string เป็น array แบบปลอดภัย
    let suitableForArray = [];
    if (suitableFor) {
      try {
        suitableForArray = JSON.parse(suitableFor); // เช่น [1,2]
      } catch (e) {
        console.warn("suitableFor ไม่ใช่ JSON ที่ถูกต้อง:", suitableFor);
        suitableForArray = [];
      }
    }

    const menu = await prisma.menu.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        restaurantId: parseInt(restaurantId),
        categoryId: parseInt(categoryId),
        nutrition: nutrition
          ? { create: JSON.parse(nutrition) }
          : undefined,
        suitableFor: suitableForArray.length
          ? {
              connect: suitableForArray.map((id) => ({ id: parseInt(id) })),
            }
          : undefined,
      },
      include: {
        nutrition: true,
        suitableFor: true,
      },
    });

    res.status(201).json(menu);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเพิ่มเมนู:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเพิ่มเมนู' });
  }
}
// แก้ไขเมนู (PUT)
async function updateMenu(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, image, restaurantId, nutrition, suitableFor, categoryId } = req.body;

    const updatedMenu = await prisma.menu.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price,
        image,
        restaurantId,
        nutrition: {
          update: nutrition,
        },
        suitableFor: {
          set: suitableFor.map((id) => ({ id })),
        },
        categoryId,
      },
      include: {
        nutrition: true,
        suitableFor: true,
      },
    });

    res.status(200).json(updatedMenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแก้ไขเมนู' });
  }
}

// ลบเมนู (DELETE)
async function deleteMenu(req, res) {
  try {
    const { id } = req.params;

    await prisma.menu.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).json({ delete: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบเมนู' });
  }
}

// ดึงข้อมูลเมนู (GET)
async function getMenu(req, res) {
  try {
    const { id } = req.params;

    const menu = await prisma.menu.findUnique({
      where: { id: parseInt(id) },
      include: {
        nutrition: true,
        suitableFor: true,
      },
    });

    if (!menu) {
      return res.status(404).json({ error: 'ไม่พบเมนู' });
    }

    // แปลง path image จาก C:\... เป็น URL ที่ client ใช้ได้
    if (menu.image) {
      const imagePath = menu.image.split('Middleware\\')[1];
      menu.image = `http://192.168.1.172:5000/images/${imagePath.replace(/\\/g, '/')}`;
    }

    res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลเมนู' });
  }
}

// เพิ่มร้านอาหาร (POST)
async function addRestaurant(req, res) {
  try {
    const { name, description, address , phone, website } = req.body;

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        description,
        address,
        phone,
        website,
      },
    });

    res.status(201).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเพิ่มร้านอาหาร' });
  }
}

// แก้ไขร้านอาหาร (PUT)
async function updateRestaurant(req, res) {
  try {
    const { id } = req.params;
    const { name, description, address, latitude, longitude, phone, website } = req.body;

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        address,
        latitude,
        longitude,
        phone,
        website,
      },
    });

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแก้ไขร้านอาหาร' });
  }
}

// ลบร้านอาหาร (DELETE)
async function deleteRestaurant(req, res) {
  try {
    const { id } = req.params;

    await prisma.restaurant.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบร้านอาหาร' });
  }
}

// ดึงข้อมูลร้านอาหาร (GET)
async function getRestaurant(req, res) {
  try {
    const { id } = req.params;

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(id) },
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'ไม่พบร้านอาหาร' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลร้านอาหาร' });
  }
}

// เพิ่มหมวดหมู่ (POST)
async function addCategory(req, res) {
  try {
    const { name } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่' });
  }
}

// แก้ไขหมวดหมู่ (PUT)
async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name,
      },
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแก้ไขหมวดหมู่' });
  }
}

// ลบหมวดหมู่ (DELETE)
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบหมวดหมู่' });
  }
}

// ดึงข้อมูลหมวดหมู่ (GET)
async function getCategory(req, res) {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        menus: {
          include: {
            restaurant: true,
            nutrition: true,
            suitableFor: true,
          },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'ไม่พบหมวดหมู่' });
    }

    // แปลง path image ในแต่ละเมนูให้เป็น URL ที่ client ใช้ได้
    if (category.menus && category.menus.length > 0) {
      category.menus.forEach(menu => {
        if (menu.image) {
          const parts = menu.image.split('images\\');
          if (parts.length > 1) {
            const imagePath = parts[1].replace(/\\/g, '/');
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            menu.image = `${baseUrl}/images/${imagePath}`;
          }
        }
      });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่' });
  }
}

// แนะนำเมนู (GET)
async function recommendMenus(req, res) {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: { healthConditions: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'ไม่พบผู้ใช้' });
    }

    const userHealthConditions = user.healthConditions.map((condition) => condition.id);

    const recommendedMenus = await prisma.menu.findMany({
      where: {
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
        nutrition: true,
        suitableFor: true,
        category: true,
      },
    });

    // แปลง path รูปภาพทั้งหมดในเมนูให้เป็น URL ที่สามารถใช้จาก client
    recommendedMenus.forEach(menu => {
      if (menu.image) {
        const parts = menu.image.split('images\\');
        if (parts.length > 1) {
          const imagePath = parts[1].replace(/\\/g, '/');
          const baseUrl = `${req.protocol}://${req.get('host')}`;
          menu.image = `${baseUrl}/images/${imagePath}`;
        }
      }
    });

    res.status(200).json(recommendedMenus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแนะนำเมนู' });
  }
}

async function getBestSellerMenus(req, res) {
  try {
    const { userId } = req.params; // รับ userId จาก request params

    if (!userId) {
      return res.status(400).json({ error: "ต้องระบุ userId" });
    }

    // ดึงข้อมูล Best Seller Menus โดยอิงจาก userId (เมนูที่ผู้ใช้เคยสั่ง)
    const bestSellerMenus = await prisma.bestSellerMenu.findMany({
      where: {
        menu: {
          orderItems: {
            some: {
              order: {
                userId: parseInt(userId),
              },
            },
          },
        },
      },
      include: {
        menu: {
          include: {
            restaurant: true,
            category: true,
            nutrition: true,
            suitableFor: true,
          },
        },
        restaurant: true,
      },
    });

    res.status(200).json(bestSellerMenus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล Best Seller" });
  }
}
async function newBestSeller(req, res) {
  try {
    const { restaurantId, menuId } = req.body;

    if (!restaurantId || !menuId) {
      return res.status(400).json({ error: "ต้องระบุ restaurantId และ menuId" });
    }

    const newBestSellerMenu = await prisma.bestSellerMenu.create({
      data: {
        restaurantId: parseInt(restaurantId),
        menuId: parseInt(menuId),
      },
      include: {
        menu: {
          include: {
            restaurant: true,
            category: true,
            nutrition: true,
            suitableFor: true,
          },
        },
        restaurant: true,
      },
    });

    res.status(201).json(newBestSellerMenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่ม Best Seller" });
  }
}

async function updateBestSeller(req, res) {
  try {
    const { id } = req.params;
    const { restaurantId, menuId } = req.body;

    if (!restaurantId || !menuId) {
      return res.status(400).json({ error: "ต้องระบุ restaurantId และ menuId" });
    }

    const updatedBestSellerMenu = await prisma.bestSellerMenu.update({
      where: { id: parseInt(id) },
      data: {
        restaurantId: parseInt(restaurantId),
        menuId: parseInt(menuId),
      },
      include: {
        menu: {
          include: {
            restaurant: true,
            category: true,
            nutrition: true,
            suitableFor: true,
          },
        },
        restaurant: true,
      },
    });

    res.status(200).json(updatedBestSellerMenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการแก้ไข Best Seller" });
  }
}

async function deleteBestSeller(req, res) {
  try {
    const { id } = req.params;

    await prisma.bestSellerMenu.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send(); // ส่ง status 204 (No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบ Best Seller" });
  }
}

module.exports = {
  addMenu,
  updateMenu,
  deleteMenu,
  getMenu,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurant,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  recommendMenus,
  getBestSellerMenus,
  newBestSeller,
  updateBestSeller,
  deleteBestSeller,
};