import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.food.createMany({
    data: [
        {
          "foodName": "สเต็กไก่ย่าง",
          "category": "MEAL",
          "ingredients": ["อกไก่", "เครื่องเทศ", "น้ำมันมะกอก"],
          "ratings": 4.5,
          "nutrition": "{ 'protein': 30, 'fat': 5, 'carbs': 10 }",
          "calories": 250,
          "price": 180,
          "location": "Healthy Food Cafe"
        },
        {
          "foodName": "พาสต้าโฮลวีตซอสมะเขือเทศ",
          "category": "MEAL",
          "ingredients": ["เส้นโฮลวีต", "ซอสมะเขือเทศ", "อกไก่"],
          "ratings": 4.7,
          "nutrition": "{ 'protein': 20, 'fat': 3, 'carbs': 40 }",
          "calories": 320,
          "price": 200,
          "location": "Italian Bistro"
        },
        {
          "foodName": "ซุปฟักทอง",
          "category": "APPETIZER",
          "ingredients": ["ฟักทอง", "นมอัลมอนด์", "เครื่องเทศ"],
          "ratings": 4.8,
          "nutrition": "{ 'protein': 5, 'fat': 2, 'carbs': 20 }",
          "calories": 150,
          "price": 120,
          "location": "Organic Kitchen"
        },
        {
          "foodName": "สลัดทูน่าอโวคาโด",
          "category": "SALAD",
          "ingredients": ["ทูน่า", "อโวคาโด", "ผักสลัด"],
          "ratings": 4.9,
          "nutrition": "{ 'protein': 25, 'fat': 15, 'carbs': 5 }",
          "calories": 280,
          "price": 150,
          "location": "Salad House"
        },
        {
          "foodName": "น้ำมะนาวโซดา",
          "category": "DRINK",
          "ingredients": ["มะนาว", "โซดา", "น้ำผึ้ง"],
          "ratings": 4.6,
          "nutrition": "{ 'sugar': 5 }",
          "calories": 50,
          "price": 80,
          "location": "Juice Bar"
        },
        {
          "foodName": "แพนเค้กโฮลวีตกับน้ำผึ้ง",
          "category": "DESSERT",
          "ingredients": ["แป้งโฮลวีต", "น้ำผึ้ง", "ไข่"],
          "ratings": 4.5,
          "nutrition": "{ 'protein': 10, 'fat': 8, 'carbs': 35 }",
          "calories": 280,
          "price": 140,
          "location": "Healthy Bakery"
        },
        {
          "foodName": "ข้าวกล้องผัดกุ้ง",
          "category": "MEAL",
          "ingredients": ["ข้าวกล้อง", "กุ้ง", "ผัก"],
          "ratings": 4.7,
          "nutrition": "{ 'protein': 22, 'fat': 4, 'carbs': 45 }",
          "calories": 350,
          "price": 180,
          "location": "Thai Street Food"
        },
        {
          "foodName": "ซุปมิโสะ",
          "category": "APPETIZER",
          "ingredients": ["เต้าเจี้ยวมิโสะ", "สาหร่าย", "เต้าหู้"],
          "ratings": 4.6,
          "nutrition": "{ 'protein': 8, 'fat': 2, 'carbs': 12 }",
          "calories": 90,
          "price": 100,
          "location": "Japanese Diner"
        },
        {
          "foodName": "สลัดผลไม้โยเกิร์ต",
          "category": "SALAD",
          "ingredients": ["ผลไม้รวม", "โยเกิร์ต", "เมล็ดเจีย"],
          "ratings": 4.8,
          "nutrition": "{ 'protein': 6, 'fat': 2, 'carbs': 25 }",
          "calories": 150,
          "price": 120,
          "location": "Wellness Cafe"
        },
        {
          "foodName": "สมูทตี้เบอร์รี่",
          "category": "DRINK",
          "ingredients": ["บลูเบอร์รี่", "สตรอว์เบอร์รี่", "โยเกิร์ต"],
          "ratings": 4.9,
          "nutrition": "{ 'protein': 5, 'sugar': 10 }",
          "calories": 120,
          "price": 100,
          "location": "Smoothie Hub"
        },
        {
          "foodName": "ไอศกรีมกะทิไร้น้ำตาล",
          "category": "DESSERT",
          "ingredients": ["กะทิ", "สารให้ความหวาน", "วานิลลา"],
          "ratings": 4.4,
          "nutrition": "{ 'protein': 2, 'fat': 12, 'carbs': 10 }",
          "calories": 150,
          "price": 130,
          "location": "Vegan Ice Cream"
        },
        {
          "foodName": "ปลาย่างซอสซีอิ๊ว",
          "category": "MEAL",
          "ingredients": ["ปลา", "ซีอิ๊วญี่ปุ่น", "ขิง"],
          "ratings": 4.8,
          "nutrition": "{ 'protein': 35, 'fat': 6, 'carbs': 5 }",
          "calories": 280,
          "price": 220,
          "location": "Japanese Diner"
        },
        {
          "foodName": "ก๋วยเตี๋ยวเส้นบุกต้มยำ",
          "category": "MEAL",
          "ingredients": ["เส้นบุก", "หมู", "น้ำซุปต้มยำ"],
          "ratings": 4.7,
          "nutrition": "{ 'protein': 25, 'fat': 8, 'carbs': 20 }",
          "calories": 260,
          "price": 150,
          "location": "Noodle House"
        }
      ]
      
  });

  console.log("✅ Mockup Data Inserted Successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
