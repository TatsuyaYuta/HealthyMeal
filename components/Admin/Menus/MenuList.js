import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';

const MenuList = ({ onEdit, isDarkMode, category, userId }) => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const styles = getStyles(isDarkMode);

    useEffect(() => {
        const fetchMenus = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:5000/api/menus/user/${userId}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to fetch menus: ${response.status} - ${errorData.message || 'Unknown error'}`);
                }
                const data = await response.json();
                setMenus(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (userId) {
            fetchMenus();
        } else {
            setError('userId is required');
            setLoading(false);
        }
    }, [userId]);

    const handleDelete = useCallback(async (id) => {
        Alert.alert(
            'ยืนยันการลบ',
            'คุณแน่ใจหรือไม่ว่าต้องการลบเมนูนี้?',
            [
                { text: 'ยกเลิก', style: 'cancel' },
                {
                    text: 'ลบ',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await fetch(`http://localhost:5000/api/menus/${id}`, { method: 'DELETE' });
                            if (response.ok) {
                                setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
                            } else {
                                Alert.alert('เกิดข้อผิดพลาด', 'เกิดข้อผิดพลาดในการลบเมนู');
                            }
                        } catch (err) {
                            console.error('Error deleting menu:', err);
                            Alert.alert('เกิดข้อผิดพลาด', 'เกิดข้อผิดพลาดในการลบเมนู');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    }, []);

    const filteredMenus = useMemo(() => {
        return category === 'all' ? menus : menus.filter((menu) => menu.categoryId.toString() === category);
    }, [menus, category]);

    const renderItem = useCallback(({ item }) => (
        <View style={styles.menuItem}>
            <Text style={styles.menuText}>{item.name} - {item.price} บาท</Text>
            <View style={styles.buttonContainer}>
                <Button title="แก้ไข" onPress={() => onEdit(item.id)} color={isDarkMode ? '#888' : '#007bff'} />
                <Button title="ลบ" onPress={() => handleDelete(item.id)} color={isDarkMode ? '#d32f2f' : '#f44336'} />
            </View>
        </View>
    ), [onEdit, handleDelete, isDarkMode]);

    if (loading) {
        return <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#000'} />;
    }

    if (error) {
        return <Text style={styles.errorText}>เกิดข้อผิดพลาด: {error}</Text>;
    }

    return (
        <FlatList
            data={filteredMenus}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

const getStyles = (isDarkMode) => StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: isDarkMode ? '#333' : '#ccc',
        backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
        marginBottom: 10,
        borderRadius: 8,
    },
    menuText: {
        color: isDarkMode ? '#fff' : '#000',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default MenuList;