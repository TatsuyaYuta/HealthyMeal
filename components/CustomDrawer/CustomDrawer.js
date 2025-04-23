// CustomDrawer.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// ✅ เมนูแต่ละรายการใน Drawer
const DrawerItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Image source={icon} style={styles.menuIcon} />
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

// ✅ Custom Drawer Content (Updated)
const CustomDrawerContent = () => (
  <View style={styles.drawer}>
    <View style={styles.profileContainer}>
      <Image source={require('../../assets/icons/User.png')} style={styles.profileImage} />
      <Text style={styles.profileName}>Samson</Text> {/* ห่อข้อความด้วย Text */}
      <Text style={styles.profileEmail}>example123@example.com</Text> {/* ห่อข้อความด้วย Text */}
    </View>

    <View style={styles.menuList}>
      <DrawerItem icon={require('../../assets/icons/Order.png')} label="My Orders" />
      <DrawerItem icon={require('../../assets/icons/User.png')} label="My Profile" />
      <DrawerItem icon={require('../../assets/icons/Delivery.png')} label="Delivery Address" />
      <DrawerItem icon={require('../../assets/icons/Setting.png')} label="Settings" />
    </View>

    <TouchableOpacity style={styles.logoutButton}>
      <Image source={require('../../assets/icons/Logout.png')} style={styles.menuIcon} />
      <Text style={styles.menuLabel}>Log Out</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E95D2F',
    height: '100%',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
  },
  menuList: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuIcon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  menuLabel: {
    fontSize: 16,
    color: '#FFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
});

export default CustomDrawerContent;
