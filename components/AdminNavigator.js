import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet } from 'react-native';
import  MenuAdmin from './Admin/Menus/MenuAdmin';
// import RestaurantAdmin from './Admin/Restaurants/RestaurantAdmin';
// import CategoryAdmin from './Admin/Categories/CategoryAdmin';
// import RecommendedAdmin from './Admin/Recommended/RecommendedAdmin';
// import BestSellerAdmin from './Admin/BestSeller/BestSellerAdmin';

const Stack = createStackNavigator();

const AdminNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Menus" component={MenuAdmin} options={{ headerShown: false }} />
                {/* <Stack.Screen name="Restaurants" component={RestaurantAdmin} />
                <Stack.Screen name="Categories" component={CategoryAdmin} />
                <Stack.Screen name="Recommended" component={RecommendedAdmin} />
                <Stack.Screen name="Best Seller" component={BestSellerAdmin} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AdminNavigator;