import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const FormInput = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [dailyRoutine, setDailyRoutine] = useState('');
  const [diet, setDiet] = useState('');
  const [exercise, setExercise] = useState('');
  const [medication, setMedication] = useState('');

  const handleGenderChange = (type) => {
    setGender(type);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>กรอกข้อมูล</Text>

      <Text style={styles.label}>Age</Text>
      <TextInput placeholder="อายุ" value={age} onChangeText={setAge} style={styles.input} />

      <Text style={styles.label}>Weight</Text>
      <TextInput placeholder="น้ำหนัก" value={weight} onChangeText={setWeight} style={styles.input} />

      <Text style={styles.label}>Height</Text>
      <TextInput placeholder="ส่วนสูง" value={height} onChangeText={setHeight} style={styles.input} />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.checkboxContainer}>
        {['male', 'female', 'other'].map((type) => (
          <TouchableOpacity key={type} onPress={() => handleGenderChange(type)} style={styles.checkbox}>
            <View style={gender === type ? styles.checked : styles.unchecked} />
            <Text style={{ marginLeft: 10 }}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>โรคประจำตัว</Text>
      <TextInput placeholder="โรคประจำตัวของคุณ" value={dailyRoutine} onChangeText={setDailyRoutine} style={styles.input} />
      <Text style={styles.comment}>**หากไม่มีเขียนว่า ไม่มี**</Text>

      <Text style={styles.label}>การแพ้อาหาร</Text>
      <TextInput placeholder="การแพ้อาหารของคุณ" value={diet} onChangeText={setDiet} style={styles.input} />
      <Text style={styles.comment}>**หากไม่มีเขียนว่า ไม่มี**</Text>

      <Text style={styles.label}>ประวัติการผ่าตัด/กำลังผ่าตัด</Text>
      <TextInput placeholder="ประวัติการผ่าตัด (บริจาคโลหิต)" value={exercise} onChangeText={setExercise} style={styles.input} />
      <Text style={styles.comment}>**หากไม่มีเขียนว่า ไม่มี**</Text>

      <Text style={styles.label}>ยาที่กำลังใช้อยู่</Text>
      <TextInput placeholder="ยาที่กำลังใช้อยู่" value={medication} onChangeText={setMedication} style={styles.input} />
      <Text style={styles.comment}>**หากไม่มีเขียนว่า ไม่มี**</Text>

      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} color="orange" />
        <Button title="Next" onPress={() => alert('Next Pressed')} color="yellow" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  comment:{
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  unchecked: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  checked: {
    width: 20,
    height: 20,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default FormInput;
