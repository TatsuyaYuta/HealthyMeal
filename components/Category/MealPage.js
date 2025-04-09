import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import TopBarTest from '../TopBar/TopBarTest';
import BottomNav from '../NavBar/BottomNav';
import CategoryList from './Main/CategoryList';

const categories = [
  { id: 1, name: 'Meal', image: require('../../assets/icons/Meal.png') },
  { id: 2, name: 'Appetizers', image: require('../../assets/icons/Appetizers.png') },
  { id: 3, name: 'Dessert', image: require('../../assets/icons/Dessert.png') },
  { id: 4, name: 'Salad', image: require('../../assets/icons/Salad.png') },
  { id: 5, name: 'Drinks', image: require('../../assets/icons/Drinks.png') },
];

const meals = [
  {
    id: '1',
    name: 'เนื้อเต้าหู้ซอส',
    rating: 4.8,
    price: '75 ฿',
    image: 'https://www.pim.in.th/images/all-side-dish-vegetarian/fried-tofu-with-guilin-chilli-sauce/fried-tofu-with-guilin-chilli-sauce-18.jpg',
  },
  {
    id: '2',
    name: 'อกไก่ยำแจ่ว',
    rating: 4.3,
    price: '75 ฿',
    image: 'https://img-global.cpcdn.com/recipes/e94e2f2cc6f24426/680x482cq70/%E0%B8%A3%E0%B8%9B-%E0%B8%AB%E0%B8%A5%E0%B8%81-%E0%B8%82%E0%B8%AD%E0%B8%87-%E0%B8%AA%E0%B8%95%E0%B8%A3-%E0%B8%AD%E0%B8%81%E0%B9%84%E0%B8%81%E0%B8%A2%E0%B8%A2%E0%B8%B2%E0%B8%87-%E0%B8%99%E0%B8%B3%E0%B8%88%E0%B8%A1%E0%B9%81%E0%B8%88%E0%B8%A7-lowsodium-%E0%B9%80%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%9C%E0%B8%AD%E0%B8%A1%E0%B9%81%E0%B8%99.jpg',
  },
];

const MealPage = () => {

  return (
    <View style={styles.container}>
      <TopBarTest />
      
      <ScrollView style={styles.scrollView}>

        <View style={styles.mainContent}>
          <View style={styles.categoryListContent}>
            <CategoryList categories={categories} />
          </View>
          
          <View style={styles.sortByContainer}>
            <Text style={styles.sortByText}>Sort By</Text>
            <TouchableOpacity>
              <Text style={styles.sortByOption}>Popular</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.filterButton}>
              <Image source={require('../../assets/icons/ViewAll.png')} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>
          
          {/* Meal List */}
          <FlatList
            data={meals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.mealCard}>
                <Image source={{ uri: item.image }} style={styles.mealImage} />
                <View style={styles.mealDetails}>
                  <Text style={styles.mealName}>{item.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingValue}>{item.rating}</Text>
                    <Image source={require('../../assets/icons/Star.png')} style={styles.starIcon} />
                  </View>
                  <Text style={styles.mealPrice}>{item.price}</Text>
                </View>
              </View>
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </ScrollView>
      
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC757',
    paddingTop: 30,
  },
  scrollView: {
    flex: 1,
  },
  categoryListContent:{
    backgroundColor: '#FE8935',
    overflow: 'hidden',
  },
  mainContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flex: 1,
    overflow: 'hidden',
    paddingBottom: 80, // Space for bottom nav
  },
  sortByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sortByText: {
    fontSize: 16,
    fontFamily: 'Kanit-Regular',
    marginRight: 8,
  },
  sortByOption: {
    fontSize: 16,
    fontFamily: 'Kanit-Regular',
    color: '#FF4500',
    marginRight: 'auto',
    justifyContent: 'flex-end',
  },
  filterButton: {
    width: 32,
    height: 32,
    backgroundColor: '#FFE9BA',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  mealCard: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  mealImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
  },
  mealDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  mealName: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Kanit-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5F1F',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  ratingValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Kanit-Regular',
    marginRight: 4,
  },
  starIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  mealPrice: {
    fontSize: 16,
    fontFamily: 'Kanit-Medium',
  },
  separator: {
    height: 1,
    backgroundColor: '#FD561F',
    marginHorizontal: 20,
    marginBottom: 12,
  },
});

export default MealPage;
