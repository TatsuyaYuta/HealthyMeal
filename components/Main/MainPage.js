import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, StyleSheet, ImageBackground } from 'react-native';
import BottomNav from '../NavBar/BottomNav';
import TopBarTest from '../TopBar/TopBarTest';
import CategoryList from '../Category/Main/CategoryList';

const categories = [
  { id: 1, name: 'Meal', image: require('../../assets/icons/Meal.png') },
  { id: 2, name: 'Appetizers', image: require('../../assets/icons/Appetizers.png') },
  { id: 3, name: 'Dessert', image: require('../../assets/icons/Dessert.png') },
  { id: 4, name: 'Salad', image: require('../../assets/icons/Salad.png') },
  { id: 5, name: 'Drinks', image: require('../../assets/icons/Drinks.png') },
];

const bestSeller = [
  { id: 1, image: 'https://s359.kapook.com/rq/580/435/50/pagebuilder/5e55736c-0c3a-4724-82b1-eada77ae78e8.jpg', price: '60 ฿' },
  { id: 2, image: 'https://i.pinimg.com/736x/b7/89/62/b78962330a1f0c72a9d3202cd7643811.jpg', price: '60 ฿' },
  { id: 3, image: 'https://www.krungsricard.com/KrungsriCreditCard/media/html/10-salmon-sunflower.jpg', price: '60 ฿' },
  { id: 4, image: 'https://files.vogue.co.th/uploads/healthy-food-6.jpg', price: '60 ฿' },
];

const promoSlides = [
  { id: 1, image: 'https://www.est-33.com/main/wp-content/uploads/2024/01/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%A7.jpg', text: 'Buy 3 get 1 FREE' },
  { id: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReys0tP7-i3qQgMQF0-rceogF-Rh1tSCNlRg&s', text: 'Free Delivery' },
  { id: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVthmdqTWBIrXGXX4hCEdv90gw7wSrK_VLRy_jESi15rZdUA3rdLryMQrGWTnZYWYZuB8&usqp=CAU', text: '20% Off for Members' },
];

const recommend = [
  { id: 1, image: 'https://files.vogue.co.th/uploads/healthy-food-7.jpg', price: '60 ฿' },
  { id: 2, image: 'https://www.krungsricard.com/KrungsriCreditCard/media/html/5-salad-chicken.jpg', price: '60 ฿' },
  { id: 3, image: 'https://www.krungsricard.com/KrungsriCreditCard/media/html/5-salad-chicken.jpg', price: '60 ฿' },
  { id: 4, image: 'https://www.krungsricard.com/KrungsriCreditCard/media/html/5-salad-chicken.jpg', price: '60 ฿' },
  { id: 5, image: 'https://www.krungsricard.com/KrungsriCreditCard/media/html/5-salad-chicken.jpg', price: '60 ฿' },
];

const MainPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % promoSlides.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: nextIndex * 371.5, animated: true });
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>

      <TopBarTest />

      <Text style={styles.welcomeText}>Welcome, Arunee</Text>
      <Text style={styles.subText}>What do you want to eat?</Text>

      <ScrollView contentContainerStyle={styles.mainContent}>

      <CategoryList categories={categories} />
      
        <View style={styles.line} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Seller</Text>
          <TouchableOpacity>
            <View style={styles.viewAllContainer}>
              <Text style={styles.viewAll}>View All</Text>
              <Image source={require('../../assets/icons/ViewAll.png')} style={styles.iconViewAll} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bestSellerContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {bestSeller.map((item) => (
              <View key={item.id} style={styles.foodCard}>
                <Image source={{ uri: item.image }} style={styles.foodImage} />
                <Text style={styles.foodPrice}>{item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.promoContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const contentOffsetX = event.nativeEvent.contentOffset.x;
              const index = Math.round(contentOffsetX / 361);
              setCurrentIndex(index);
            }}
          >
            {promoSlides.map((item) => (
              <View key={item.id} style={styles.promoSlide}>
                <ImageBackground source={{ uri: item.image }} style={styles.promoImage}>
                  <View style={styles.promoOverlay}>
                    <Text style={styles.promoText}>{item.text}</Text>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Reccommend</Text>
          <TouchableOpacity>
            <View style={styles.viewAllContainer}>
              <Text style={styles.viewAll}>View All</Text>
              <Image source={require('../../assets/icons/ViewAll.png')} style={styles.iconViewAll} />
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={recommend}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.recommendContainer}
          renderItem={({ item }) => (
            <View style={styles.foodCardrecommend}>
              <Image source={{ uri: item.image }} style={styles.recommendImage} />
              
              <View style={styles.reviewContainer}>
                <Text style={styles.reviewText}>4.8</Text>
                <Image source={require('../../assets/icons/Star.png')} style={styles.starIcon} />
              </View>
              
              <View style={styles.heartContainer}>
                <Image source={require('../../assets/icons/PinkHeart.png')} style={styles.heartIcon} />
              </View>

              <Text style={styles.foodPriceRecommend}>{item.price}</Text>
            </View>
          )}
        />

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
    minHeight: '100%',
  },
  welcomeText: {
    fontSize: 26,
    marginHorizontal: 20,
    fontFamily: 'Kanit-Medium',
    marginTop: -10,
  },
  subText: {
    fontSize: 13,
    marginHorizontal: 20,
    color: '#555',
    fontFamily: 'Kanit-Regular',
    marginBottom: 10,
  },
  mainContent: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderRadius: 50,
    height: '100%',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  category: {
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 13,
    marginTop: 5,
    fontFamily: 'Kanit-Regular',
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
  line: {
    width: 376,
    height: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
    alignSelf: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Kanit-Regular',
    paddingHorizontal: 20,
  },
  viewAllContainer: {
    flexDirection: 'row',  
    alignItems: 'center',  
    paddingTop: 5,       
    paddingHorizontal: 20,
  },
  viewAll: {
    fontSize: 13,
    fontFamily: 'Kanit-Regular',
  },
  iconViewAll: {
    width: 22,
    height: 22,
    marginLeft: 5,
  },
  bestSellerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  foodCard: {
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 6.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingBottom: 10,
  },
  foodImage: {
    width: 81,
    height: 109,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  foodPrice: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Kanit-Regular',
    position: 'absolute',
    bottom: 20,
    right: -3,
    color: '#fff',
    backgroundColor: '#259437',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    width: 40,
    height: 18.18,
  },
  promoContainer: {
    paddingHorizontal: 20,
  },
  promoSlide: {
    width: 371.5,
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  promoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  promoOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  promoText: {
    position: 'absolute',
    fontSize: 36,
    fontFamily: 'Kanit-ExtraBold',
    color: '#FFF',
  },
  recommendContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    height: 143,
    justifyContent: 'space-between',
  },
  foodPriceRecommend: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Kanit-Regular',
    position: 'absolute',
    bottom: 10,
    right: -3,
    color: '#fff',
    backgroundColor: '#FD561F',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    width: 55,
    height: 25,
  },
  foodCardrecommend: {
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  recommendImage:{
    width: 180,
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  foodCardrecommend: {
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  reviewContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 2,
    borderRadius: 15,
    width: 45,
    height: 25,
    gap: 2,
  },
  starIcon: {
    width: 16,
    height: 16.56,
  },
  reviewText: {
    color: '#00',
    fontSize: 12,
    fontFamily: 'Kanit-Regular',
    textAlign: 'center',
    marginLeft: 5,
  },
  heartContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  heartIcon: {
    width: 12, 
    height: 12, 
  },
  foodPriceRecommend: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Kanit-Regular',
    position: 'absolute',
    bottom: 10,
    right: -3,
    color: '#fff',
    backgroundColor: '#FD561F',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    width: 55,
    height: 25,
  },
});

export default MainPage;