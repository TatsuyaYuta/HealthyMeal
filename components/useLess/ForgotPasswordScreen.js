import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Polygon } from "react-native-svg";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleSendEmail = () => {
    console.log('Send verification email to:', email);
  };

  const StarIcon = ({ size = 50, color = "#FEDF73" }) => {
    return (
      <Svg width={size} height={size} viewBox="0 0 50 50">
        <Polygon
          points="25,0 31,18 50,18 34,29 40,47 25,36 10,47 16,29 0,18 19,18"
          fill={color}
          strokeWidth="2"
        />
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>

      <View style= {styles.star3}>
        <StarIcon size={42.95} />
      </View>
      <View style= {styles.star4}>
        <StarIcon size={35.43} />
      </View>

      <View style={styles.ellipse61} />
      <View style={styles.ellipse63} />
      <View style={styles.ellipse62} />
        <Text style={styles.title}>Healthy meal</Text>
        <Text style={styles.subtitle}>Forget Password</Text>

        <View style={styles.circle} />

        <Text style={styles.description}>
          Please enter your Email address to receive a verification card.
        </Text>

        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.resendText}>send email again.</Text>

        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>

        <View style={styles.line} />

        <Text style={styles.footerText}>Try another way.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A6DFF7',
    padding: 20,
    minHeight: '100%',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    fontSize: 40,
    color: '#000',
    fontFamily: 'MuseoModerno-Bold',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  subtitle: {
    fontSize: 24,
    color: '#000',
    marginBottom: 20,
    fontFamily: 'MuseoModerno-Medium',
  },
  circle: {
    width: 165,
    height: 165,
    backgroundColor: '#3A78C9',
    borderRadius: 165 / 2,
    marginBottom: 20,
  },
  description: {
    fontSize: 20,
    fontFamily: 'Itim-Regular',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Itim-Regular',
    alignSelf: 'flex-start',
    marginLeft: 20,
    color: '#000',
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#000',
    backgroundColor: '#fff',
    marginBottom: 10,
    fontFamily: 'Itim-Regular',
    fontSize: 15,
  },
  resendText: {
    fontSize: 14,
    fontFamily: 'Itim-Regular',
    color: '#000',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FECF30',
    borderRadius: 20,
    alignItems: 'center',
    width: 137,
    height: 40,
  },
  buttonText: {
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  footerText: {
    fontSize: 20,
    fontFamily:'Itim-Regular',
    color: '#000',
    marginTop: 20,
  },

  line: {
    position: 'flex',
    width: 265,
    height: 1,
    borderTopWidth: 1, 
    borderTopColor: '#000000',
    marginTop: 40,
  },
  star3: {
    position: 'absolute',
    left: 325,
    top: 140,
    transform: [{ rotate: '31.62deg' }],
  },
  star4: {
    position: 'absolute',
    left: 15,
    top: 110,
    transform: [{ rotate: '-14.69deg' }],
  },
  ellipse61: {
    position: 'absolute',
    width: 9,
    height: 9,
    left: 60,
    top: 195,
    backgroundColor: '#FEDF73',
    borderRadius: 4.5,
  },
  ellipse63: {
    position: 'absolute',
    width: 9,
    height: 9,
    left: 305,
    top: 210,
    backgroundColor: '#FEDF73',
    borderRadius: 4.5,
  },
  ellipse62: {
    position: 'absolute',
    width: 9,
    height: 9,
    left: 275,
    top: 110,
    backgroundColor: '#FEDF73',
    borderRadius: 4.5,
  },
});

export default ForgotPasswordScreen;
