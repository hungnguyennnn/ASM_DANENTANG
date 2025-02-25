import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
  } from 'react-native';
  import React from 'react';
import { router } from 'expo-router';
  
  const Setting = () => {
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
      <View style={{flex: 1, backgroundColor: '#0c0f14'}}>
        <View style={{ marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
              height: 60,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                router.push("/ManChinh")
              }}>
              <Image
                style={{left: 15, height: 40, width: 40}}
                source={require('../assets/images/ic_back.png')}
              />
            </TouchableOpacity>
            <Text style={st.title}>Setting</Text>
          </View>
        </View>
        <View style={st.bgr}>
          <View style={st.bgr1}>
            <Image style={st.img} source={require('../assets/images/history.png')} />
            <TouchableOpacity>
              <Text style={st.txt}>History</Text>
            </TouchableOpacity>
          </View>
          <Image style={st.img} source={require('../assets/images/Arrow.png')} />
        </View>
        <View style={st.bgr}>
          <View style={st.bgr1}>
            <Image style={st.img} source={require('../assets/images/account.png')} />
            <TouchableOpacity
            //   onPress={() => {
            //     navigation.navigate('AccountScreen');
            //   }}
              >
              <Text style={st.txt}>Personal Details</Text>
            </TouchableOpacity>
          </View>
          <Image style={st.img} source={require('../assets/images/Arrow.png')} />
        </View>
        <View style={st.bgr}>
          <View style={st.bgr1}>
            <Image style={st.img} source={require('../assets/images/location.png')} />
            <TouchableOpacity>
              <Text style={st.txt}>Address</Text>
            </TouchableOpacity>
          </View>
          <Image style={st.img} source={require('../assets/images/Arrow.png')} />
        </View>
        <View style={st.bgr}>
          <View style={st.bgr1}>
            <Image style={st.img} source={require('../assets/images/payment.png')} />
            <TouchableOpacity
            //   onPress={() => {
            //     navigation.navigate('PaymentScreen');
            //   }}
              >
              <Text style={st.txt}>Payment Method</Text>
</TouchableOpacity>
          </View>
          <Image style={st.img} source={require('../assets/images/Arrow.png')} />
        </View>
        <View style={st.bgr}>
          <View style={st.bgr1}>
            <Image style={st.img} source={require('../assets/images/about.png')} />
            <TouchableOpacity>
              <Text style={st.txt}>About</Text>
            </TouchableOpacity>
          </View>
          <Image style={st.img} source={require('../assets/images/Arrow.png')} />
        </View>
        <View style={st.bgr}>
          <View style={st.bgr1}>
            <Image style={st.img} source={require('../assets/images/help.png')} />
            <TouchableOpacity
            //   onPress={() => {
            //     navigation.navigate('ContactScreen');
            //   }}
              >
              <Text style={st.txt}>Help</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={st.bgr}>
          <View style={st.bgr1}>
            <Image style={st.img} source={require('../assets/images/logout.png')} />
            <TouchableOpacity onPress={logout}>
              <Text style={st.txt}>Log out</Text>
            </TouchableOpacity>
          </View>
          <Image style={st.img} source={require('../assets/images/Arrow.png')} />
        </View>
      </View>
    );
  };
  
  
  const st = StyleSheet.create({
    title: {
      color: 'white',
      fontSize: 26,
      fontWeight: 'bold',
      marginEnd: 150,
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
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      marginLeft: 20,
    },
    img: {
      height: 30,
      width: 30,
      marginRight: 30,
    },
  });
  export default Setting;