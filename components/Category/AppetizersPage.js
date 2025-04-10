import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import TopBarTest from '../TopBar/TopBarTest';
import BottomNav from '../NavBar/BottomNav';
import CategoryList from './Main/CategoryList';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: 1, name: 'Meal', image: require('../../assets/icons/Meal.png') },
  { id: 2, name: 'Appetizers', image: require('../../assets/icons/Appetizers.png') },
  { id: 3, name: 'Dessert', image: require('../../assets/icons/Dessert.png') },
  { id: 4, name: 'Salad', image: require('../../assets/icons/Salad.png') },
  { id: 5, name: 'Drinks', image: require('../../assets/icons/Drinks.png') },
];

const appetizers = [
  {
    id: '1',
    name: 'แซลม่อนโทส',
    rating: 4.8,
    price: '115 ฿',
    image: 'https://img.wongnai.com/p/1920x0/2017/10/02/5278920fee9a40329d0988d9938535ec.jpg',
  },
  {
    id: '2',
    name: 'อกไก่ยำแจ่ว',
    rating: 4.3,
    price: '85 ฿',
    image: 'https://t3.ftcdn.net/jpg/03/15/22/02/360_F_315220207_lGC14p4nkMuWC1sDIegjrYblbbpIcKKE.jpg',
  },
];

const AppetizersPage = () => {

    const navigation = useNavigation();

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
              <Image source={require('../../assets/icons/Filter.png')} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>

          {appetizers.map((item) => (
            <TouchableOpacity
                key={item.id}
                onPress={() => navigation.navigate('AppetizersDetail', { appetizers: item })}
                style={styles.appetizersCard}
            >
                <Image source={{ uri: item.image }} style={styles.appetizersImage} />
                <View style={styles.appetizersDetails}>
                <Text style={styles.appetizersName}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingValue}>{item.rating}</Text>
                    <Image source={require('../../assets/icons/Star.png')} style={styles.starIcon} />
                </View>
                <Text style={styles.appetizersPrice}>{item.price}</Text>
                </View>
                <View style={styles.line}/>
            </TouchableOpacity>
            ))}
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
    paddingBottom: 80,
  },
  sortByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
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
    width: 52,
    height: 33,
    backgroundColor: '#FFC757',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  filterIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  appetizersCard: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  appetizersImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
  },
  appetizersDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  appetizersName: {
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
  appetizersPrice: {
    fontSize: 16,
    fontFamily: 'Kanit-Medium',
  },
  line: {
    width: 376,
    height: 0,
    borderWidth: 0.5,
    borderColor: '#FD561F',
    alignSelf: 'center',
  },
});

export default AppetizersPage;