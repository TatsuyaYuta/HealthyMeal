const express = require('express');
const router = express.Router();
const upload = require('../Middleware/uploadMiddleware');
const {
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
  newBestSeller,
  getBestSellerMenus,
  updateBestSeller,
  deleteBestSeller,
  
} = require('../Controllers/menuController');

// เส้นทางสำหรับเมนู
router.post('/menus', upload.single('image'), addMenu); // done
router.put('/menus/:id', updateMenu); // inprogress
router.delete('/menus/:id', deleteMenu); // done
router.get('/menus/:id', getMenu); // done

// เส้นทางสำหรับร้านอาหาร
router.post('/restaurants', addRestaurant); // done
router.put('/restaurants/:id', updateRestaurant); // inprogress
router.delete('/restaurants/:id', deleteRestaurant); // done
router.get('/restaurants/:id', getRestaurant); // done

// เส้นทางสำหรับหมวดหมู่
router.post('/categories', addCategory); // done
router.put('/categories/:id', updateCategory); // inprogress
router.delete('/categories/:id', deleteCategory); // inprogress
router.get('/categories/:id', getCategory); // done

// เส้นทางสำหรับแนะนำเมนู
router.get('/recommendMenus/:userId', recommendMenus); // done

// เส้นทางสำหรับ Best Seller
router.post("/bestSellerMenus", newBestSeller); // inprogress
router.get("/bestSellerMenus/:id", getBestSellerMenus); // inprogress
router.put("/bestSellerMenus/:id", updateBestSeller); // inprogress
router.delete("/bestSellerMenus/:id", deleteBestSeller); // inprogress

module.exports = router;