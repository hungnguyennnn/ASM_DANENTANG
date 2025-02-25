import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const categories = ["All", "Cappuccino", "Espresso", "Americano", "Macchiato"];

const CoffeeShop = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [coffeeData, setCoffeeData] = useState([]);
  const [beanData, setBeanData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coffeeResponse = await fetch("http://192.168.1.11:3000/producs_coffee");
        const beanResponse = await fetch("http://192.168.1.11:3000/produc_bean");

        const coffeeResult = await coffeeResponse.json();
        const beanResult = await beanResponse.json();

        setCoffeeData(coffeeResult);
        setBeanData(beanResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>$ {item.price}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={16} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
         <TouchableOpacity onPress={() =>  navigation.replace('SettingsScreen')} >
          <Ionicons name="grid-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Find the best coffee for you</Text>
        <Ionicons name="person-circle-outline" size={30} color="#fff" />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.icon} />
        <TextInput style={styles.searchInput} placeholder="Find Your Coffee..." placeholderTextColor="#aaa" />
      </View>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCategory(item)}>
            <Text style={[styles.category, selectedCategory === item && styles.selectedCategory]}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#ff7f50"  />
      ) : (
        <>
          <Text style={styles.sectionTitle}>Coffee</Text>
          <FlatList data={coffeeData} renderItem={renderItem} horizontal keyExtractor={(item) => item.id.toString()} />

          <Text style={styles.sectionTitle}>Coffee Beans</Text>
          <FlatList data={beanData} renderItem={renderItem} horizontal keyExtractor={(item) => item.id.toString()} />
        </>
      )}
    </SafeAreaView>
  );
};

// Component yêu thích
const FavoritesScreen = () => (
  <View style={styles.center}>
    <Text style={styles.text}>Favorites Screen</Text>
  </View>
);

// Component thông báo
const NotificationsScreen = () => (
  <View style={styles.center}>
    <Text style={styles.text}>Notifications Screen</Text>
  </View>
);

// Component giỏ hàng
const CartScreen = () => (
  <View style={styles.center}>
    <Text style={styles.text}>Cart Screen</Text>
  </View>
);

// Bottom Tab Navigation
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = focused ? "home" : "home-outline";
          else if (route.name === "Favorites") iconName = focused ? "heart" : "heart-outline";
          else if (route.name === "Cart") iconName = focused ? "cart" : "cart-outline";
          else if (route.name === "Notifications") iconName = focused ? "notifications" : "notifications-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ff7f50",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: { backgroundColor: "#1e1e1e", borderTopWidth: 0 },
      })}
    >
      <Tab.Screen name="Home" component={CoffeeShop} options={{ headerShown: false }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

// Navigation chính của App
export default function App() {
  return (
   
      <BottomTabs />

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1e1e1e", paddingHorizontal: 16 },
  header: {
     flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 50 },
  headerText: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  searchContainer: { flexDirection: "row", backgroundColor: "#2a2a2a", borderRadius: 18, padding: 10, marginVertical: 20 },
  icon: { margin: 10 },
  searchInput: { flex: 1, color: "#fff" },
  category: { fontSize: 18, color: "#aaa", paddingHorizontal: 15, paddingVertical: 10 },
  selectedCategory: { color: "#ff7f50", fontWeight: "bold" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginVertical: 10 },
  card: { backgroundColor: "#2a2a2a", borderRadius: 15, padding: 15, marginRight: 15, width: 160, height: 220 },
  image: { width: "100%", height: "60%", borderRadius: 10 },
  title: { fontSize: 16, fontWeight: "bold", color: "#fff", marginTop: 5 },
  price: { fontSize: 14, color: "#ff7f50", marginTop: 2 },
  addButton: { position: "absolute", bottom: 10, right: 10, backgroundColor: "#ff7f50", padding: 5, borderRadius: 5 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1e1e1e" },
  text: { fontSize: 22, color: "#fff", fontWeight: "bold" },
});
