import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AppetizersPage = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Welcome to the Appetizers Page</Text>
      <Button
        title="Go to Category List"
        onPress={() => {
          navigation.navigate('MainPage', { selectedCategory: 'Appetizers' });
        }}
      />
    </View>
  );
};

export default AppetizersPage;
