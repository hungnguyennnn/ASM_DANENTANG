import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ManChao() {
  const router = useRouter(); // Hook điều hướng từ expo-router

  useEffect(() => {
    // Tự động chuyển sang màn đăng nhập sau 3 giây
    const timer = setTimeout(() => {
      router.replace("/ManDN"); // Điều hướng sang màn `ManDN`
    }, 1000);

    // Xóa bộ đếm nếu component bị huỷ
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Logo.png")}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000014",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
});
