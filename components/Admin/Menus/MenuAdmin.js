import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import AddMenu from './AddMenu';
import EditMenu from './EditMenu';
import MenuList from './MenuList';
import Sidebar from './Sidebar';
import { Appearance } from 'react-native-web';

const MenuAdmin = () => {
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const [activeTab, setActiveTab] = useState('list');
    const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

    useEffect(() => {
        const handleColorSchemeChange = (preferences) => {
            setIsDarkMode(preferences.colorScheme === 'dark');
        };

        Appearance.addChangeListener(handleColorSchemeChange);

        return () => {
            Appearance.removeChangeListener(handleColorSchemeChange);
        };
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(previousState => !previousState);
    };

    const styles = getStyles(isDarkMode);

    return (
        <View style={styles.container}>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
            <ScrollView style={styles.content}>
                <View style={styles.darkModeToggle}>
                    <Text style={styles.darkModeText}>Dark Mode</Text>
                    <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
                </View>
                {activeTab === 'list' && <MenuList onEdit={setSelectedMenuId} isDarkMode={isDarkMode} />}
                {activeTab === 'add' && <AddMenu isDarkMode={isDarkMode} />}
                {activeTab === 'edit' && selectedMenuId && <EditMenu menuId={selectedMenuId} onClose={() => setSelectedMenuId(null)} isDarkMode={isDarkMode} />}
            </ScrollView>
        </View>
    );
};

const getStyles = (isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: isDarkMode ? '#121212' : '#f0f0f0',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    darkModeToggle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
    },
    darkModeText: {
        marginRight: 10,
        color: isDarkMode ? '#fff' : '#000',
    },
});

export default MenuAdmin;