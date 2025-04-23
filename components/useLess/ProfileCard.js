import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';  // ใช้ Icon แทน FontAwesomeIcon

const ProfileCard = ({ name, role, imageUrl }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>
        {name} <Icon name="pencil" size={20} color="black" /> {/* ใช้ไอคอนจาก FontAwesome */}
      </Text>
      <Text style={styles.role}>{role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  name: {
    fontSize: 32,
    fontWeight: '600',
    marginTop: 12,
    flexDirection: 'row', // ทำให้ชื่อและไอคอนอยู่ในแถวเดียวกัน
    alignItems: 'center', // จัดไอคอนให้อยู่ตรงกลางแนวตั้ง
  },
  role: {
    color: '#6B7280',
  },
});

export default ProfileCard;
