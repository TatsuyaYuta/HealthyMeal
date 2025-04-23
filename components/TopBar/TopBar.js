import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  TextInput
} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

export const TopBarWithDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  
  // Function to toggle drawer
  const toggleDrawer = () => {
    const toValue = drawerOpen ? -DRAWER_WIDTH : 0;
    
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setDrawerOpen(!drawerOpen);
    });
  };

  // Handle drawer gesture
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent;
      
      // If drawer is open and user swipes left, close it
      if (drawerOpen && translationX < 0) {
        setDrawerOpen(false);
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } 
      // If drawer is closed, keep it closed regardless of gesture
      else if (!drawerOpen) {
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
      // Otherwise reset to open position
      else {
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  // Semi-transparent overlay when drawer is open
  const overlayOpacity = translateX.interpolate({
    inputRange: [-DRAWER_WIDTH, 0],
    outputRange: [0, 0.5],
    extrapolate: 'clamp',
  });
  
  // This ensures overlay only appears when drawer is animating or open
  const overlayStyle = {
    ...styles.overlay,
    opacity: overlayOpacity,
    // Add pointer events: none when drawer is closed
    pointerEvents: drawerOpen ? 'auto' : 'none',
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          {/* Logo */}
          <Image 
            source={require('../../assets/icons/Logo.png')}
            style={styles.logoImage}
          />
          
          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchIcon}>🔍</Text>
            </TouchableOpacity>
          </View>
          
          {/* User Profile Button (Drawer Toggle) */}
          <TouchableOpacity onPress={toggleDrawer} style={styles.profileButton}>
            <Image 
              source={require('../../assets/icons/User.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        
        {/* Semi-transparent overlay - Always rendered but with conditional opacity */}
        <TouchableOpacity
          activeOpacity={1}
          style={styles.overlayTouchable}
          onPress={toggleDrawer}
          pointerEvents={drawerOpen ? 'auto' : 'none'}
        >
          <Animated.View style={overlayStyle} />
        </TouchableOpacity>

        {/* Drawer - Always rendered but positioned off-screen when closed */}
        <View style={styles.drawerWrapper}>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
            activeOffsetX={[-10, 10]} // Only respond to clear horizontal drags
          >
            <Animated.View 
              style={[
                styles.drawer, 
                { transform: [{ translateX: translateX.interpolate({
                  inputRange: [-DRAWER_WIDTH, 0],
                  outputRange: [-DRAWER_WIDTH, 0],
                  extrapolate: 'clamp',
                }) }] }
              ]}
            >  
              <View style={styles.drawerHeader}>
                <View style={styles.profileContainer}>
                  <View style={styles.profileImageContainer}>
                    <Image
                      source={{ uri: 'https://via.placeholder.com/60' }}
                      style={styles.profileImageLarge}
                    />
                  </View>
                  <Text style={styles.userName}>Samson</Text>
                  <Text style={styles.userEmail}>example123@example.com</Text>
                </View>
              </View>
              
              <View style={styles.drawerContent}>
                <TouchableOpacity style={styles.drawerItem}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>🍽️</Text>
                  </View>
                  <Text style={styles.drawerItemText}>My Orders</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.drawerItem}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>👤</Text>
                  </View>
                  <Text style={styles.drawerItemText}>My Profile</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.drawerItem}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>📍</Text>
                  </View>
                  <Text style={styles.drawerItemText}>Delivery Address</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.drawerItem}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>⚙️</Text>
                  </View>
                  <Text style={styles.drawerItemText}>Settings</Text>
                </TouchableOpacity>
                
                <View style={styles.spacer} />
                
                <TouchableOpacity style={styles.logoutItem}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>🚪</Text>
                  </View>
                  <Text style={styles.drawerItemText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 99,
    backgroundColor: '#FFC757', // Yellow/orange background from the image
  },
  logoImage: {
    width: 105,
    height: 105,
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: 234,
    height: 40,
    marginLeft: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
  },
  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 36/2,
    backgroundColor: '#FF6B35', // Orange search button
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -7,
  },
  searchIcon: {
    fontSize: 16,
    color: '#FFF',
  },
  profileButton: {
    width: 44,
    height: 37,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  profileImage: {
    width: 20,
    height: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 998,
  },
  drawerWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    zIndex: 999,
    overflow: 'hidden',
    minHeight: 1100,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    right: -DRAWER_WIDTH,
    width: DRAWER_WIDTH,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 20,
    zIndex: 1000,
  },
  drawerHeader: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FF5722',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  profileImageLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FF5722',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: 18,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFF',
  },
  spacer: {
    flex: 1,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 30,
  },
});