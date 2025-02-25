import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';


export default function ManDN() {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [name, setName] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();
    const handleNavigate = () => {
        // Điều hướng đến màn hình "ManDK" khi bấm
        router.push('/ManDN'); // Đảm bảo ManDK là một route hợp lệ trong dự án của bạn
    };

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const handleNameChange = (text: string) => {
        setName(text);
        if (text === '') {
            setNameError('Tên không được để trống');
        } else {
            setNameError('');
        }
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (text && !emailRegex.test(text)) {
            setIsEmailValid(false);
            setEmailError('Email không hợp lệ. Vui lòng nhập email hợp lệ.');
        } else {
            setIsEmailValid(true);
            setEmailError('');
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (text !== '') {
            setPasswordError('');
        } else {
            setPasswordError('');
        }
    };
    const handleRePasswordChange = (text: string) => {
        setRePassword(text);
        if (text !== password) {
            setRePasswordError('Mật khẩu nhập lại không khớp');
        } else {
            setRePasswordError('');
        }
    };

    const handleSubmit = async () => {
        setIsSubmitted(true);
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setRePasswordError('');
    
        if (!name) {
            setNameError('Nhập Tên');
            return;
        }
        if (!email) {
            setEmailError('Nhập Tài Khoản');
            return;
        }
        if (!password) {
            setPasswordError('Nhập Mật Khẩu');
            return;
        }
        if (!rePassword) {
            setRePasswordError('Nhập lại Mật Khẩu');
            return;
        }
        if (rePassword !== password) {
            setRePasswordError('Mật khẩu nhập lại không khớp');
            return;
        }
        if (!isEmailValid) {
            setEmailError('Email không hợp lệ');
            return;
        }
    
        // Gửi dữ liệu lên API
        try {
            const response = await fetch('http:10.24.51.6:3000/Users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Đăng ký thất bại, vui lòng thử lại.');
            }
    
            Alert.alert('Thành công', 'Bạn đã đăng ký thành công!', [
                {
                    text: 'OK',
                    onPress: () => {
                        router.push('/ManDN'); // Chuyển về màn hình đăng nhập
                    },
                },
            ]);
        } catch (error) {
            console.error('Lỗi:', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!');
        }
    };
    

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image source={require('../assets/images/Logo.png')} style={styles.logo} />

            {/* Welcome Text */}
            <Text style={styles.welcomeText}>Welcome to Lungo !!</Text>
            <Text style={styles.subText}>Register to Continue</Text>

            {/* name Input */}
            <TextInput
                placeholder="Name"
                placeholderTextColor="#8e8e8e"
                style={[
                    styles.input,
                    styles.transparentInput,
                    isSubmitted && name === '' && { borderColor: 'red' }, // Đổi viền đỏ nếu lỗi
                ]}

                value={name}
                onChangeText={handleNameChange}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            <TextInput
                placeholder="Email Address"
                placeholderTextColor="#8e8e8e"
                style={[
                    styles.input,
                    styles.transparentInput,
                    isSubmitted && email === '' && { borderColor: 'red' }, // Đổi viền đỏ nếu lỗi
                ]}
                keyboardType="email-address"
                value={email}
                onChangeText={handleEmailChange}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            {/* Password Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#8e8e8e"
                    style={[
                        styles.input,
                        styles.transparentInput,
                        isSubmitted && password === '' && { borderColor: 'red' },
                        passwordError && { borderColor: 'red' },
                    ]}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={handlePasswordChange}
                />
                {/* Eye Icon */}
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Image
                        source={showPassword ? require('../assets/images/eye-closed.png') : require('../assets/images/eye-open.png')}
                        style={styles.eyeImage}
                    />
                </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            {/*Re_type Password Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Re_type Password"
                    placeholderTextColor="#8e8e8e"
                    style={[
                        styles.input,
                        styles.transparentInput,
                        isSubmitted && password === '' && { borderColor: 'red' },
                        passwordError && { borderColor: 'red' },
                    ]}
                    secureTextEntry={!showPassword}
                    value={rePassword}
                    onChangeText={handleRePasswordChange}
                />
                {/* Eye Icon */}
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Image
                        source={showPassword ? require('../assets/images/eye-closed.png') : require('../assets/images/eye-open.png')}
                        style={styles.eyeImage}
                    />
                </TouchableOpacity>
            </View>
            {rePasswordError ? <Text style={styles.errorText}>{rePasswordError}</Text> : null}

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
                <Text style={styles.signInButtonText}>Register</Text>
            </TouchableOpacity>




            {/* Footer */}
            <View style={styles.footerContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.footerText}>You have an account? Click </Text>
                    <TouchableOpacity onPress={handleNavigate}>
                        <Text style={styles.linkText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000014',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 30,
    },
    welcomeText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subText: {
        color: '#8e8e8e',
        fontSize: 16,
        marginBottom: 30,
    },
    input: {
        width: '100%',
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        color: 'white',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#8e8e8e',
    },
    transparentInput: {
        backgroundColor: 'transparent',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    eyeIcon: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    eyeImage: {
        width: 35,
        height: 30,
        tintColor: '#8e8e8e',
    },
    signInButton: {
        width: '100%',
        backgroundColor: '#d17842',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 5,
    },
    signInButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    footerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {
        color: '#8e8e8e',
        fontSize: 14,
        marginBottom: 10,
    },
    linkText: {
        color: '#d87d56',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 5,
        marginLeft: 5,
        alignSelf: 'flex-start',
    },
});
