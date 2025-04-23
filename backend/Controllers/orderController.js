const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE ORDER: สร้างคำสั่งซื้อ
const createOrder = async (req, res) => {
    const { userId, items } = req.body;
  
    try {
      const order = await prisma.order.create({
        data: {
          userId,
          items: {
            create: items.map(item => ({
              menuId: item.menuId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });
  
      res.status(201).json({ message: 'Order created successfully', order });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // MY ORDERS: ดูคำสั่งซื้อของฉัน
  const getUserOrders = async (req, res) => {
    const { userId } = req.query;
  
    try {
      const orders = await prisma.order.findMany({
        where: { userId: parseInt(userId) },
        include: {
          items: true,
        },
      });
  
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // GET ORDER: ดูรายละเอียดคำสั่งซื้อ
  const getOrderDetails = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const order = await prisma.order.findUnique({
        where: { id: parseInt(orderId) },
        include: {
          items: true,
        },
      });
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  module.exports = { createOrder, getUserOrders, getOrderDetails };