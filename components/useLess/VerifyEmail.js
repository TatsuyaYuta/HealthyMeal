import { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  const handleChangeText = (text, index) => {
    if (text.length > 1) text = text.charAt(0);
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    console.log("Entered OTP:", otp.join(""));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Image source={require('../assets/icons/arrow.png')} style={{ width: 36, height: 36 }} />
      </TouchableOpacity>

      <View style={styles.circle} />

      <Text style={styles.title}>Verify your email</Text>
      <Text style={styles.subtitle}>
        Please enter the 4 digit code sent to {"\n"} 
        <Text style={styles.emailText}>wearespu123@gmail.com</Text>
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleBackspace(e, index)}
          />
        ))}
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.resendText}>Don’t receive the Code?</Text>
        <Text style={styles.resendLink}>RESEND Code</Text>
      </View>

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
    padding: 10,
  },
  circle: {
    width: 198,
    height: 198,
    backgroundColor: '#3674B5',
    borderRadius: 198 / 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Itim-Regular',
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Itim-Regular',
  },
  emailText: {
    fontFamily: 'Itim-Regular',
    color: '#000',
    fontSize: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderColor: '#000',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    elevation: 15,
  },
  resendText: {
    fontSize: 20,
    color: '#000',
    marginBottom: 20,
    fontFamily: 'Itim-Regular',
  },
  resendLink: {
    fontSize: 20,
    color: '#000',
    marginBottom: 20,
    fontFamily: 'Itim-Regular',
    textDecorationLine: 'underline',
    marginLeft: 20, 
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

export default VerifyEmail;