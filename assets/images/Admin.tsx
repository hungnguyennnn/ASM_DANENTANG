import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

// Tạo các màn hình mẫu
const HomeScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen</Text>
    </View>
);


const SettingsScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetch('http:192.168.1.11:3000/Users')
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setEmail(data[0].user); // Lấy email từ user đầu tiên
                }
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);
   
    const logout = () => {
        try {
            Alert.alert('Thông báo', 'Bạn muốn đăng xuất', [
                {
                    text: 'Không',
                    style: 'cancel',
                },

                {
                    text: 'Có',
                    onPress: () => {
                        router.push("/ManDN")
                    },
                },
            ]);
        } catch (error) {
            Alert.alert("error");
        }
    };

    return (
        <View style={styles.container}>
            {/* Phần hiển thị avatar và email */}
            <View style={styles.profileContainer}>
                <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.avatar} />
                <Text style={styles.email}>{email || 'Loading...'}</Text>
            </View>

            {/* Danh sách các mục */}
            <View style={styles.menuContainer}>
                <View style={styles.bgr}>
                    <View style={styles.bgr1}>
                        <Image style={styles.img} source={require('../assets/images/logout.png')} />
                        <TouchableOpacity onPress={logout}>
                            <Text style={styles.txt}>Log out</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </View>
    );
};





// Tạo Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Hàm render label
const RenderLabal = (props: {
    focused: boolean,
    color: string,
    children: string
}) =>
    props.focused ? (
        <Text style={[styles.labal, { color: props.color }]}>{props.children}</Text>
    ) : null;

const RenderIcon = (
    icon: string,
    props: {
        focused: boolean,
        color: string,
        size: number
    }) => (
    <Image source={{ uri: icon }} tintColor={props.color} height={16} width={16} />
);

// Hàm render icon với MaterialIcons


export default function App() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'black',
                tabBarLabelStyle: { flexDirection: 'row' }
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: props => RenderIcon("https://cdn-icons-png.flaticon.com/512/25/25694.png", props),
                    tabBarLabel: props => RenderLabal(props)
                }}
            />

            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: props => RenderIcon("https://cdn-icons-png.flaticon.com/512/3524/3524659.png", props),
                    tabBarLabel: props => RenderLabal(props)
                }}
            />

        </Tab.Navigator>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuContainer: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    icon: {
        marginRight: 10,
    },
    menuText: {
        fontSize: 16,
    },
    bgr: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        justifyContent: 'space-between',
    },
    bgr1: {
        flexDirection: 'row',
        marginLeft: 20,
    },
    txt: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
    },
    img: {
        height: 30,
        width: 30,
        marginRight: 30,
    },
    labal: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
    },

});
