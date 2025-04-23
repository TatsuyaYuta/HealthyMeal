import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const AddMenu = ({ isDarkMode }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        restaurantId: '',
        categoryId: '',
        suitableFor: [],
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSuitableForChange = (text) => {
        const suitableForArray = text.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
        setFormData({ ...formData, suitableFor: suitableForArray });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/menus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    price: parseInt(formData.price, 10),
                    image: formData.image,
                    restaurantId: parseInt(formData.restaurantId, 10),
                    categoryId: parseInt(formData.categoryId, 10),
                    suitableFor: formData.suitableFor,
                }),
            });
            if (response.ok) {
                alert('เมนูถูกเพิ่มแล้ว');
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    image: '',
                    restaurantId: '',
                    categoryId: '',
                    suitableFor: [],
                });
            } else {
                alert('เกิดข้อผิดพลาด');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const styles = getStyles(isDarkMode);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>เพิ่มเมนูใหม่</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>ชื่อเมนู:</Text>
                <TextInput style={styles.input} value={formData.name} onChangeText={(text) => handleChange('name', text)} />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>รายละเอียด:</Text>
                <TextInput style={styles.input} value={formData.description} onChangeText={(text) => handleChange('description', text)} multiline />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>ราคา:</Text>
                <TextInput style={styles.input} value={formData.price} onChangeText={(text) => handleChange('price', text)} keyboardType="numeric" />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>รูปภาพ (URL):</Text>
                <TextInput style={styles.input} value={formData.image} onChangeText={(text) => handleChange('image', text)} />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Restaurant ID:</Text>
                <TextInput style={styles.input} value={formData.restaurantId} onChangeText={(text) => handleChange('restaurantId', text)} keyboardType="numeric" />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Category ID:</Text>
                <TextInput style={styles.input} value={formData.categoryId} onChangeText={(text) => handleChange('categoryId', text)} keyboardType="numeric" />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Suitable For (ID):</Text>
                <TextInput
                    style={styles.input}
                    value={formData.suitableFor.join(',')}
                    onChangeText={handleSuitableForChange}
                    placeholder="เช่น 1, 2, 3"
                />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>เพิ่มเมนู</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const getStyles = (isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? '#1e1e1e' : '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#333',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: isDarkMode ? '#555' : '#ccc',
        padding: 10,
        borderRadius: 5,
        color: isDarkMode ? '#fff' : '#000',
    },
    submitButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddMenu;