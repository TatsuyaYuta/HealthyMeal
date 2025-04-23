import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Sidebar = ({ activeTab, setActiveTab, isDarkMode }) => {
    const [showMenuDropdown, setShowMenuDropdown] = useState(false);
    const styles = getStyles(isDarkMode);

    const toggleMenuDropdown = () => {
        setShowMenuDropdown(!showMenuDropdown);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={toggleMenuDropdown}>
                <Text style={styles.text}>เมนู</Text>
            </TouchableOpacity>
            {showMenuDropdown && (
                <View>
                    <TouchableOpacity style={[styles.dropdownItem, activeTab === 'list' && styles.activeItem]} onPress={() => setActiveTab('list')}>
                        <Text style={styles.text}>รายการเมนู</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.dropdownItem, activeTab === 'add' && styles.activeItem]} onPress={() => setActiveTab('add')}>
                        <Text style={styles.text}>เพิ่มเมนู</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.dropdownItem, activeTab === 'edit' && styles.activeItem]} onPress={() => setActiveTab('edit')}>
                        <Text style={styles.text}>แก้ไขเมนู</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const getStyles = (isDarkMode) => StyleSheet.create({
    container: {
        width: 200,
        backgroundColor: isDarkMode ? '#333' : '#e0e0e0',
        padding: 20,
    },
    item: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: isDarkMode ? '#444' : '#ccc',
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: isDarkMode ? '#444' : '#ccc',
    },
    activeItem: {
        backgroundColor: isDarkMode ? '#555' : '#d0d0d0',
    },
    text: {
        color: isDarkMode ? '#fff' : '#000',
        fontSize: 16,
    },
});

export default Sidebar;