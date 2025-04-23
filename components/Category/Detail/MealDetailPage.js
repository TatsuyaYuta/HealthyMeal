import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import BottomNav from '../../NavBar/BottomNav';

const MealDetailPage = ({ route, navigation }) => {
  const { meal } = route.params;
  const [quantity, setQuantity] = useState(1);

  const toppings = [
    { name: 'กิมจิ', price: 30 },
    { name: 'ไข่ขาว', price: 15 },
    { name: 'ไข่ต้ม', price: 10 },
  ];

  const [checkedToppings, setCheckedToppings] = useState({});

  const handleCheckboxToggle = (name) => {
    setCheckedToppings((prev) => ({
      ...prev,
      [name]: !prev[name], 
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/icons/Back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ชื่อเมนู</Text>
        </View>

        <TouchableOpacity style={styles.heartIconBackground}>
          <Image source={require('../../../assets/icons/GreyHeart.png')} style={styles.heartIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>{meal.rating} </Text>
        <Image source={require('../../../assets/icons/Star.png')} style={styles.starIcon} />
      </View>

      <ScrollView style={styles.content}>
        <Image source={{ uri: meal.image }} style={styles.mealImage} />

        <View style={styles.priceRow}>
          <Text style={styles.price}>{meal.price}</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <AntDesign name="minuscircleo" size={20} color="#FF5F1F" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <AntDesign name="pluscircleo" size={20} color="#FF5F1F" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line} />

        <Text style={styles.sectionTitle}>รายละเอียดอาหาร</Text>
        <Text style={styles.sectionTitleTop}>Toppings</Text>

        {toppings.map((item, index) => (
          <View key={index} style={styles.toppingRow}>
            <Text style={styles.toppingText}>{item.name}</Text>
            <View style={styles.toppingRight}>
              <Text style={styles.toppingPrice}>{item.price} ฿</Text>
              <TouchableOpacity
                style={[
                  styles.toppingCheckbox,
                  checkedToppings[item.name] && styles.checkedCheckbox,
                ]}
                onPress={() => handleCheckboxToggle(item.name)}
              >
                {checkedToppings[item.name] && (
                  <Ionicons name="checkmark" size={18} color="white" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.buttonCart}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>
              <Image source={require('../../../assets/icons/Store.png')} style={styles.storeIcon} />
              Add to Cart
            </Text>
          </TouchableOpacity>
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
    paddingTop: 40,
    minHeight: '100%',
  },
  header: {
    backgroundColor: '#FFC757',
    paddingHorizontal: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Kanit-Medium',
    color: '#000000',
    marginLeft: 10,
  },
  heartIcon: {
    width: 29,
    height: 29,
  },
  heartIconBackground: {
    backgroundColor: '#FFF',
    borderRadius: 48 / 2,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    backgroundColor: '#FF5F1F',
    alignSelf: 'flex-start',
    margin: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    alignItems: 'center',
  },
  ratingText: {
    color: 'white',
    fontFamily: 'Kanit-Regular',
    fontWeight: '500',
  },
  starIcon: {
    width: 14,
    height: 14,
    marginLeft: 4,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  content: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderRadius: 50,
  },
  mealImage: {
    width: 355,
    height: 242,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 30,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  price: {
    color: '#FF4500',
    fontSize: 24,
    fontFamily: 'Kanit-SemiBold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
    fontFamily: 'Kanit-Light',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Kanit-Light',
    marginLeft: 24,
    marginTop: 10,
    marginBottom: 8,
    color: '#000000',
  },
  sectionTitleTop: {
    fontSize: 24,
    fontFamily: 'Kanit-Medium',
    marginLeft: 24,
    marginBottom: 8,
    color: '#000000',
  },
  toppingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    alignItems: 'center',
  },
  toppingText: {
    fontSize: 16,
    color: '#333333',
  },
  toppingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toppingPrice: {
    fontSize: 16,
    color: '#333333',
    marginRight: 10, // เพิ่ม margin ให้ระหว่างราคาและ checkbox
  },
  toppingCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF5F1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#FF5F1F', // สีเมื่อ checkbox ถูกเลือก
  },
  buttonCart: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  addToCartButton: {
    backgroundColor: '#FF5F1F',
    margin: 24,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 161,
    height: 55,
  },
  storeIcon: {
    width: 23,
    height: 23,
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  line: {
    width: 376,
    height: 0,
    borderWidth: 0.5,
    borderColor: '#FD561F',
    alignSelf: 'center',
  },
});

export default MealDetailPage;
