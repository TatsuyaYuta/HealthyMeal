import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const TopBarTest = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <Image source={require('../../assets/icons/Logo.png')} style={styles.logo} />

            <View style={styles.searchContainer}>
            <TextInput style={[styles.searchInput, { fontFamily: 'Kanit-Regular' }]} placeholder="Search" />
            <View style={styles.searchIconContainer}>
                <Image source={require('../../assets/icons/Search.png')}  style={styles.searchIcon} />
            </View>
            </View>

            <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../../assets/icons/User.png')} style={styles.iconUser}/>
            </TouchableOpacity>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        
      },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      logo: {
        width: 89,
        height: 89,
        alignSelf: 'flex-start',
        marginLeft: 0,
      },
      searchContainer: {
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
      searchIcon: {
        width: 17.28,
        height: 18,
        alignSelf: 'center',
      },
      searchIconContainer: {
        backgroundColor: '#FD561F',
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        justifyContent: 'center',
        marginRight: -7,
      },
      iconButton: {
        width: 44,
        height: 37,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
      },
      iconUser:{
        width: 20,
        height: 20,
      },
});

export default TopBarTest;