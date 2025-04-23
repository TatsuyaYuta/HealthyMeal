import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const EditMenu = ({ menuId, onClose, isDarkMode }) => {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch(`/api/menus/${menuId}`);
            const data = await response.json();
            setFormData(data);
        };
        fetchMenu();
    }, [menuId]);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`/api/menus/${menuId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('เมนูถูกแก้ไขแล้ว');
                onClose();
            } else {
                alert('เกิดข้อผิดพลาด');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const styles = getStyles(isDarkMode);

    if (!formData) return <Text style={styles.loadingText}>Loading...</Text>;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>ชื่อเมนู:</Text>
            <TextInput style={styles.input} value={formData.name} onChangeText={(text) => handleChange('name', text)} />

            <Text style={styles.label}>รายละเอียด:</Text>
            <TextInput style={styles.input} value={formData.description} onChangeText={(text) => handleChange('description', text)} multiline />

            <Text style={styles.label}>ราคา:</Text>
            <TextInput style={styles.input} value={formData.price} onChangeText={(text) => handleChange('price', text)} keyboardType="numeric" />

            {/* เพิ่ม input fields สำหรับ formData อื่น ๆ */}

            <View style={styles.buttonContainer}>
                <Button title="บันทึกการแก้ไข" onPress={handleSubmit} color={isDarkMode ? '#888' : '#007bff'} />
                <Button title="ยกเลิก" onPress={onClose} color={isDarkMode ? '#555' : '#888'} />
            </View>
        </ScrollView>
    );
};

const getStyles = (isDarkMode) => StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
        padding: 15,
        borderRadius: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#000',
    },
    input: {
        borderWidth: 1,
        borderColor: isDarkMode ? '#555' : '#ccc',
        padding: 10,
        marginBottom: 10,
        color: isDarkMode ? '#fff' : '#000',
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    loadingText: {
        color: isDarkMode ? '#fff' : '#000',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default EditMenu;