import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const BottomNav = () => {
  const navigation = useNavigation(); // Get navigation object

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
        <Image source={require('../../assets/icons/Home.png')} style={styles.icon} />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Store')}>
        <Image source={require('../../assets/icons/Store.png')} style={styles.icon} />
        <Text style={styles.label}>Store</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => navigation.navigate('Favorite')}>
        <Image source={require('../../assets/icons/Heart.png')} style={styles.iconHeart} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <Image source={require('../../assets/icons/History.png')} style={styles.icon} />
        <Text style={styles.label}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={require('../../assets/icons/Profile.png')} style={styles.icon} />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FE8935',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconHeart: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    position: 'fixed',
    bottom: 30,
    width: 70,
    height: 70,
    backgroundColor: '#FFC757',
    borderRadius: 70 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BottomNav;
