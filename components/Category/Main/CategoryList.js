import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const CategoryList = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const route = useRoute(); // ใช้ route เพื่อตรวจสอบหมวดหมู่ที่เลือก
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params && route.params.selectedCategory) {
      setSelectedCategory(route.params.selectedCategory); // เมื่อได้รับ selectedCategory จากหน้าที่เปลี่ยน
    }
  }, [route.params]); // ติดตามการเปลี่ยนแปลงใน route

  const handleCategoryPress = (categoryName) => {
    setSelectedCategory(categoryName); // อัปเดตหมวดหมู่ที่เลือก
    // นำทางไปยังหน้าหมวดหมู่ที่เลือก
    if (categoryName === 'Meal') navigation.navigate('MealPage', { selectedCategory: 'Meal' });
    else if (categoryName === 'Appetizers') navigation.navigate('AppetizersPage', { selectedCategory: 'Appetizers' });
    else if (categoryName === 'Dessert') navigation.navigate('DessertPage', { selectedCategory: 'Dessert' });
    else if (categoryName === 'Salad') navigation.navigate('SaladPage', { selectedCategory: 'Salad' });
    else if (categoryName === 'Drinks') navigation.navigate('DrinksPage', { selectedCategory: 'Drinks' });
  };

  // ตรวจสอบว่ามี categories หรือไม่
  if (!categories || categories.length === 0) {
    return null; // ถ้าไม่มี categories ไม่ต้องแสดงอะไร
  }

  return (
    <View style={styles.categoryContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.category, index < categories.length - 1 && styles.categoryWithMargin]}
            onPress={() => handleCategoryPress(item.name)} // เมื่อเลือกหมวดหมู่
          >
            <View
              style={[
                styles.categoryBackgroundImage,
                item.name === selectedCategory && styles.activeCategoryBackground,
              ]}
            >
              <Image
                source={item.image}
                style={styles.categoryImage}
                tintColor={item.name === selectedCategory ? '#FF4500' : '#000000'} // เปลี่ยนสีของ icon
              />
            </View>
            <Text
              style={[
                styles.categoryText,
                item.name === selectedCategory && styles.activeCategoryText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  category: {
    alignItems: 'center',
  },
  categoryWithMargin: {
    marginRight: 18,
  },
  categoryText: {
    fontSize: 13,
    marginTop: 5,
    fontFamily: 'Kanit-Regular',
    color: '#000000', // สีของข้อความที่ไม่เลือก
  },
  activeCategoryText: {
    color: '#FF4500', // สีของข้อความที่เลือก
  },
  categoryImage: {
    width: 39,
    height: 39,
    resizeMode: 'contain',
  },
  categoryBackgroundImage: {
    width: 58,
    height: 58,
    backgroundColor: '#FFF1CF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCategoryBackground: {
    backgroundColor: '#FFDFAF', // สีพื้นหลังของหมวดหมู่ที่เลือก
  },
});

export default CategoryList;
