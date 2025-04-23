import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import ProfileCard from "./ProfileCard"; 
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  return (
    <View style={styles.container}> 
      <ProfileCard
        name="Chokun" 
        role="Senior"
        imageUrl="https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"
      />

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="home" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="shopping-cart" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="apple" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="heart" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="user" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomMenu: {
    width: 430 ,
    height: 83 ,
    flexDirection: 'row',
    backgroundColor: '#578FCA',
    padding: 10,
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    alignItems: 'center',
  },
});

export default ProfileScreen;