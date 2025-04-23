import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
/*import Icon from 'react-native-vector-icons/MaterialIcons';*/
import { Image } from 'react-native';

const CreateNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerify = () => {
    if (password === confirmPassword) {
      console.log('Password successfully updated');
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        {/*<Icon name="arrow-back" size={36} color="#000" />*/}
        <Image source={require('../assets/icons/arrow.png')} style={{ width: 36, height: 36 }} />
      </TouchableOpacity>
      
      <View style={styles.circle} />
      
      <Text style={styles.title}>Create new Password</Text>
      <Text style={styles.subtitle}>
        Your new password must be different from previously password.
      </Text>
      
      <Text style={styles.label}>New password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="****************"
        secureTextEntry
      />
      
      <Text style={styles.label}>Confirm password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="****************"
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify & Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9ED',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    minHeight: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  circle: {
    width: 198,
    height: 198,
    backgroundColor: '#3674B5',
    borderRadius: 198 / 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Itim-Regular',
    color: '#000',
  },
  subtitle: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Itim-Regular',
  },
  label: {
    fontSize: 20,
    fontFamily: 'Itim-Regular',
    alignSelf: 'flex-start',
    color: '#000',
    marginLeft: 20,
    marginTop: 10,
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000',
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 20,
    fontFamily: 'Itim-Regular',
  },
  button: {
    backgroundColor: '#3674B5',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    width: 280,
    height: 60,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'MuseoModerno-SemiBold',
    color: '#fff',
  },
});

export default CreateNewPassword;
