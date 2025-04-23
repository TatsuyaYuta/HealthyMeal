import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const FormInput = ({ navigation }) => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    dailyRoutine: [],
    otherCondition: '',
    diet: '',
    exercise: '',
    medication: '',
  });

  const handleInputChange = (field, value) => {
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

  const handleDailyRoutineChange = (condition) => {
    setFormData((prev) => {
      if (condition === 'อื่นๆ') {
        return { ...prev, dailyRoutine: prev.dailyRoutine.filter(item => item !== 'อื่นๆ') };
      }
      const newRoutine = prev.dailyRoutine.includes(condition)
        ? prev.dailyRoutine.filter((item) => item !== condition)
        : prev.dailyRoutine.length < 3
        ? [...prev.dailyRoutine, condition]
        : prev.dailyRoutine;
      return { ...prev, dailyRoutine: newRoutine };
    });
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
            {[{ key: 'age', label: 'Age', placeholder: 'อายุ' }, { key: 'weight', label: 'Weight', placeholder: 'น้ำหนัก' }, { key: 'height', label: 'Height', placeholder: 'ส่วนสูง' }].map(({ key, label, placeholder }) => (
              <View key={key} style={styles.smallInputContainer}>
                <Text style={styles.labelsmall}>{label}</Text>
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

            <View style={styles.genderContainer}>
              <Text style={styles.label}>Gender</Text>
                {['Male', 'Female', 'Other'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => handleGenderChange(type.toLowerCase())}
                    style={styles.genderOption}
                  >
                    <View style={formData.gender === type.toLowerCase() ? styles.checkedBox : styles.uncheckedBox} />
                    <Text style={styles.genderText}>{type}</Text>
                  </TouchableOpacity>
              ))}
            </View>

          <Text style={[styles.label, styles.labelLeft]}>โรคประจำตัว</Text>
          <View style={styles.conditionContainer}>
            {['โรคเบาหวาน', 'ความดันโลหิตสูง', 'โรคหัวใจ'].map((condition) => (
              <TouchableOpacity
                key={condition}
                onPress={() => handleDailyRoutineChange(condition)}
                style={[styles.conditionButton, formData.dailyRoutine.includes(condition) && styles.conditionButtonSelected]}
              >
                <Text style={styles.conditionText}>{condition}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            placeholder="อื่นๆ"
            value={formData.otherCondition}
            onChangeText={(value) => handleInputChange('otherCondition', value)}
            style={styles.inputOther}
          />

          {[{ key: 'diet', label: 'การแพ้อาหาร' }, { key: 'exercise', label: 'ประวัติการผ่าตัด/กำลังผ่าตัด' }, { key: 'medication', label: 'ยาที่กำลังใช้อยู่' }].map(({ key, label }) => (
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
        </View>
          <View style={styles.line} />
          <View style={styles.ellipse11} />
          <View style={styles.ellipse12} />
          <View style={styles.ellipse13} />
          <View style={styles.ellipse14} />
          <View style={styles.ellipse15} />
          <View style={styles.ellipse16} />
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
    fontFamily: 'Itim-Regular',
    fontSize: 36,
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
    fontFamily: 'Itim-Regular',
    fontSize: 24,
    marginBottom: 5,
  },
  labelsmall: {
    fontFamily: 'Itim-Regular',
    fontSize: 20,
    marginBottom: 5,
  },
  smallInput: {
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontSize: 16,
    width: '100%',
    fontFamily: 'Itim-Regular',
    textAlign: 'center',
  },
  genderContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around', 
    marginBottom: 15,
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
    fontFamily: 'Itim-Regular',
  },
  conditionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  conditionButton: {
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    margin: 5,
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  conditionButtonSelected: {
    backgroundColor: '#FDD406',
  },
  conditionText: {
    fontSize: 16,
    fontFamily: 'Itim-Regular',
  },
  labelLeft: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    width: '100%',
  },  
  inputOther: {
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontSize: 16,
    width: '30%',
    marginBottom: 15,
    alignSelf: 'flex-start',
    fontFamily: 'Itim-Regular',
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
    fontFamily: 'Itim-Regular',
  },
  comment: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Itim-Regular',
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
    fontFamily: 'Itim-Regular',
    color: '#000',
  },
  ellipse11: {
    position: 'absolute',
    width: 175,
    height: 175,
    left: 303,
    top: 803,
    backgroundColor: '#D1F8EF',
    flex: 'none',
    order: 1,
    flexGrow: 0,
    zIndex: 1,
    borderRadius: 175 / 2,
  },
  ellipse12: {
    position: 'absolute',
    width: 175,
    height: 175,
    left: -93,
    top: 688,
    backgroundColor: '#578FCA',
    flex: 'none',
    order: 2,
    flexGrow: 0,
    zIndex: 2,
    borderRadius: 175 / 2,
  },
  ellipse15: {
    position: 'absolute',
    width: 69,
    height: 69,
    left: -25,
    top: 355,
    backgroundColor: '#D1F8EF',
    flex: 'none',
    order: 3,
    flexGrow: 0,
    zIndex: 3,
    borderRadius: 69 / 2,
  },
  ellipse13: {
    position: 'absolute',
    width: 175,
    height: 175,
    left: -93,
    top: -87,
    backgroundColor: '#578FCA',
    borderRadius: 175 / 2,
  },
  ellipse14: {
    position: 'absolute',
    width: 175,
    height: 175,
    left: 365,
    top: 100,
    backgroundColor: '#578FCA',
    flex: 'none',
    order: 5,
    flexGrow: 0,
    zIndex: 5,
    borderRadius: 175 / 2,
  },
  ellipse16: {
    position: 'absolute',
    width: 61,
    height: 61,
    left: 391,
    top: 488,
    backgroundColor: '#D1F8EF',
    flex: 'none',
    order: 6,
    flexGrow: 0,
    zIndex: 6,
    borderRadius: 61 / 2,
  },
  line: {
    position: 'absolute',
    width: 265,
    height: 0,
    left: 82,
    top: 105,
    borderWidth: 1,
    borderColor: '#000000',
    flex: 'none',
    order: 24,
    flexGrow: 0,
    zIndex: 24,
  },
});

export default FormInput;
