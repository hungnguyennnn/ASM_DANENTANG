import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    TextInput,
    Modal,
    StyleSheet
} from 'react-native';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}
const HomecoffeeScreen = () => {
   const [products, setProducts] = useState<Product[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http:192.168.1.11:3000/producs_coffee');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSave = async () => {
        if (!name || !price || !description || !image) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        const productData = { name, price, description, image };

        try {
            let response;
            if (editingId) {
                response = await fetch(`http:192.168.1.11:3000/producs_coffee/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData)
                });
            } else {
                response = await fetch('http:192.168.1.11:3000/producs_coffee', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData)
                });
            }

            if (response.ok) {
                fetchProducts();
                setModalVisible(false);
                resetForm();
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleDelete = async (id: number) => {
        Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa sản phẩm này?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Xóa',
                onPress: async () => {
                    try {
                        await fetch(`http:192.168.1.11:3000/producs_coffee/${id}`, { method: 'DELETE' });
                        fetchProducts();
                    } catch (error) {
                        console.error('Error deleting product:', error);
                    }
                }
            }
        ]);
    };

    const handleEdit = (item: any) => {
        setEditingId(item.id);
        setName(item.name);
        setPrice(item.price);
        setDescription(item.description);
        setImage(item.image);
        setModalVisible(true);
    };

    const resetForm = () => {
        setEditingId(null);
        setName('');
        setPrice('');
        setDescription('');
        setImage('');
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemTitle}>{item.name}</Text>
                            <Text>Giá: {item.price} VND</Text>
                            <Text>{item.description}</Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => handleEdit(item)}>
                                <Text style={styles.editBtn}>Sửa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Text style={styles.deleteBtn}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <TextInput placeholder="Tên" value={name} onChangeText={setName} style={styles.input} />
                    <TextInput placeholder="Giá" value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />
                    <TextInput placeholder="Mô tả" value={description} onChangeText={setDescription} style={styles.input} />
                    <TextInput placeholder="Ảnh URL" value={image} onChangeText={setImage} style={styles.input} />
                    <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Lưu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.HuyButton}>
                        <Text style={styles.HuyButtonText}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, marginTop: 30 },
    itemContainer: { flexDirection: 'row', marginVertical: 10, padding: 10, backgroundColor: '#fff', borderRadius: 10 },
    itemImage: { width: 80, height: 80, marginRight: 10, borderRadius: 10 },
    itemDetails: { flex: 1 },
    itemTitle: { fontSize: 18, fontWeight: 'bold' },
    actions: { justifyContent: 'center' },
    editBtn: { color: 'blue', marginBottom: 5 },
    deleteBtn: { color: 'red' },
    addButton: { position: 'absolute', right: 20, bottom: 20, backgroundColor: 'blue', borderRadius: 50, width: 50, height: 50, justifyContent: 'center', alignItems: 'center' },
    addButtonText: { fontSize: 24, color: 'white' },
    modalContainer: { flex: 1, justifyContent: 'center', padding: 20 },
    input: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "white",
    },
    saveButton: { backgroundColor: 'blue', padding: 10, margin: 10, alignItems: 'center' },
    HuyButton: { backgroundColor: 'blue', padding: 10, margin: 10, alignItems: 'center' },
    saveButtonText: { color: 'white', fontWeight: 'bold' },
    HuyButtonText: { color: 'white', fontWeight: 'bold' }
});

export default HomecoffeeScreen;
