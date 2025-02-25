import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CoffeeDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params; // Nhận dữ liệu từ màn hình trước
  const [selectedSize, setSelectedSize] = useState("S");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart" size={24} color="#ff4081" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>

        <Text style={styles.descriptionTitle}>Size</Text>
        <View style={styles.sizeContainer}>
          {["S", "M", "L"].map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.sizeButton, selectedSize === size && styles.activeSize]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={styles.sizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>$ {item.price}</Text>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  imageContainer: { flex: 4, position: "relative" },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  header: { position: "absolute", top: 40, left: 20, right: 20, flexDirection: "row", justifyContent: "space-between" },
  iconButton: { backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 20, padding: 10 },
  detailsContainer: { flex: 2.5, backgroundColor: "#1E1E1E", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  descriptionTitle: { fontSize: 18, fontWeight: "bold", color: "#fff", marginTop: 10 },
  description: { fontSize: 14, color: "#aaa", marginVertical: 10 },
  sizeContainer: { flexDirection: "row", marginVertical: 10, justifyContent: "space-around" },
  sizeButton: { backgroundColor: "#444", borderRadius: 10, paddingVertical: 10, paddingHorizontal: 50, marginHorizontal: 5 },
  activeSize: { backgroundColor: "#ff7f50" },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 },
  price: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  addToCartButton: { backgroundColor: "#ff7f50", borderRadius: 15, paddingVertical: 12, paddingHorizontal: 80 },
});

export default CoffeeDetailsScreen;
