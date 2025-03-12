import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const FormInput = ({ navigation }) => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    dailyRoutine: '',
    diet: '',
    exercise: '',
    medication: '',
  });

  const handleInputChange = (field, value) => {
    // กรอกเฉพาะตัวเลข อายุ, น้ำหนัก และส่วนสูง
    if (field === 'age' || field === 'weight' || field === 'height') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [field]: numericValue });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleGenderChange = (type) => {
    setFormData({ ...formData, gender: type });
  };

  const handleNext = () => {
    navigation.navigate('NextScreen', { formData });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <Text style={styles.header}>กรอกข้อมูล</Text>

          <View style={styles.rowContainer}>
            {[
              { key: 'age', label: 'Age', placeholder: 'อายุ' },
              { key: 'weight', label: 'Weight', placeholder: 'น้ำหนัก' },
              { key: 'height', label: 'Height', placeholder: 'ส่วนสูง' },
            ].map(({ key, label, placeholder }) => (
              <View key={key} style={styles.smallInputContainer}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                  placeholder={placeholder}
                  value={formData[key]}
                  onChangeText={(value) => handleInputChange(key, value)}
                  style={styles.smallInput}
                  keyboardType="numeric"
                />
              </View>
            ))}
          </View>

          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            {['Male', 'Female', 'Other'].map((type) => (
              <TouchableOpacity key={type} onPress={() => handleGenderChange(type.toLowerCase())} style={styles.genderOption}>
                <View style={formData.gender === type.toLowerCase() ? styles.checkedBox : styles.uncheckedBox} />
                <Text style={styles.genderText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {[
            { key: 'dailyRoutine', label: 'โรคประจำตัว' },
            { key: 'diet', label: 'การแพ้อาหาร' },
            { key: 'exercise', label: 'ประวัติการผ่าตัด/กำลังผ่าตัด' },
            { key: 'medication', label: 'ยาที่กำลังใช้อยู่' },
          ].map(({ key, label }) => (
            <View key={key} style={styles.inputGroup}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                placeholder={label}
                value={formData[key]}
                onChangeText={(value) => handleInputChange(key, value)}
                style={styles.input}
              />
              <Text style={styles.comment}>**หากไม่มีเขียนว่า ไม่มี**</Text>
            </View>
          ))}

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.button, styles.backButton]}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={[styles.button, styles.nextButton]}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>

          {/*ลูกกลมๆตกแต่งพื้นหลัง*/}
          <View style={styles.ellipse11}></View>
          <View style={styles.ellipse12}></View>
          <View style={styles.ellipse15}></View>
          <View style={styles.ellipse13}></View>
          <View style={styles.ellipse14}></View>
          <View style={styles.ellipse16}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A6DFF7',
    padding: 20,
    zIndex: 10,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    minHeight :'100%',
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: '100%',
    justifyContent: 'space-between',
  },
  header: {
    fontFamily: 'Itim',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  smallInputContainer: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Itim',
    fontSize: 18,
    marginBottom: 5,
  },
  smallInput: {
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  uncheckedBox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
  },
  checkedBox: {
    width: 18,
    height: 18,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  genderText: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'Itim',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontSize: 16,
    width: '100%',
  },
  comment: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'Itim',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: '#FFB300',
  },
  nextButton: {
    backgroundColor: '#FFD700',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Itim',
    color: '#000',
  },
  ellipse11: {
    position: 'absolute',
    width: 175,
    height: 175,
    left: 303,
    top: 803,
    backgroundColor: '#D1F8EF',
    zIndex: -1,
    borderRadius: 175 / 2,
  },
  ellipse12: {
    position: 'absolute',
    width: 175,
    height: 175,
    left: -93,
    top: 688,
    backgroundColor: '#578FCA',
    zIndex: -1,
    borderRadius: 175 / 2,
  },
  ellipse15: {
    position: 'absolute',
    width: 69,
    height: 69,
    left: -25,
    top: 355,
    backgroundColor: '#D1F8EF',
    zIndex: -1,
    borderRadius: 69 / 2,
  },
  ellipse13: {
    position: 'absolute',
    width: 175,
    height: 175,
    left: -93,
    top: -87,
    backgroundColor: '#578FCA',
    zIndex: -1,
    borderRadius: 175 / 2,
  },
  ellipse14: {
    position: 'absolute',
    width: 175,
    height: 175,
    left: 365,
    top: 100,
    backgroundColor: '#578FCA',
    zIndex: -1,
    borderRadius: 175 / 2,
  },
  ellipse16: {
    position: 'absolute',
    width: 61,
    height: 61,
    left: 391,
    top: 488,
    backgroundColor: '#D1F8EF',
    zIndex: -1,
    borderRadius: 61 / 2,
  },
});

export default FormInput;
