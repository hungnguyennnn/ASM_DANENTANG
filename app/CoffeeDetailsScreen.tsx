import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Product {
  image: string;
  name: string;
  description: string;
  price: string;
}

interface Props {
  productId: string;
  onGoBack: () => void;
}

const ManCoffeeData: React.FC<Props> = ({ productId, onGoBack }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);


  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`http://10.24.51.6:3000/producs_coffee/${productId}`);
        const productDetail = await res.json();
        setProduct(productDetail);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu chi tiết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <ActivityIndicator size="large" color="#ff7f50" />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <Text style={styles.errorText}>Không có dữ liệu sản phẩm</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      const response = await fetch("http://10.24.51.6:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          name: product.name,
          image: product.image,
          price: product.price,
          size: selectedSize || "M",  // Mặc định size M nếu chưa chọn
          quantity: 1,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Thêm vào giỏ hàng thành công!");
      } else {
        alert(`Lỗi: ${data.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const addFavorite = async () => {
    if (!product) return;
  
    try {
      const response = await fetch(`http://10.24.51.6:3000/producs_coffee/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          name: product.name,
          image: product.image,
          price: product.price,
          describe: product.description,
        }),
      });
  
      const text = await response.text();
      console.log("📌 Raw response (add):", text);
  
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          setIsFavorite(true);
          alert("Đã thêm vào yêu thích!");
        } else {
          alert(`Lỗi: ${data.message || "Lỗi không xác định"}`);
        }
      } catch (jsonError) {
        console.error("❌ Lỗi khi parse JSON (add):", jsonError);
        alert("Lỗi phản hồi không hợp lệ từ server!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi thêm vào yêu thích:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };
  
  const removeFavorite = async () => {
    if (!product) return;
  
    try {
      const response = await fetch(`http://10.24.51.6:3000/producs_coffee/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const text = await response.text();
      console.log("📌 Raw response (remove):", text);
  
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          setIsFavorite(false);
          alert("Đã xóa khỏi yêu thích!");
        } else {
          alert(`Lỗi: ${data.message || "Lỗi không xác định"}`);
        }
      } catch (jsonError) {
        console.error("❌ Lỗi khi parse JSON (remove):", jsonError);
        alert("Lỗi phản hồi không hợp lệ từ server!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi xóa khỏi yêu thích:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };
  
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };
  
  
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ImageBackground source={{ uri: product.image }} style={styles.imageBackground}>
        <View style={styles.overlay} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onGoBack} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={24} color="#1e1e1e" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "red" : "#000"}
            />
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View style={styles.topSection}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFD700" /> 4.5 (6,879)
          </Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ImageBackground>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.fullDescription}>
        Arabica beans are by far the most popular type of coffee beans, making up about 60% of the world’s coffee. These tasty beans originated many centuries ago in the highlands of Ethiopia, and may even be the first coffee beans ever consumed! 
        </Text>
        <Text style={styles.sectionTitle}>Size</Text>
        <View style={styles.sizeContainer}>
          {["S", "M", "L"].map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size ? styles.activeSize : null,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={styles.sizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Add to Cart */}
        <View style={styles.footer}>
          <Text style={styles.price}>{product.price || "$0.00"}</Text>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  imageBackground: {
    width: "100%",
    height: 500,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
  },
  iconButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
  },
  topSection: {
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  rating: {
    fontSize: 14,
    color: "#FFD700",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: "#aaa",
    marginVertical: 10,
  },
  bottomSection: {
    flex: 1,
    padding: 20,
    backgroundColor: "#252A32",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  fullDescription: {
    fontSize: 14,
    color: "#aaa",
    marginVertical: 10,
  },
  sizeContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  sizeButton: {
    backgroundColor: "#444",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 45,
    marginRight: 35,
  },
  activeSize: {
    backgroundColor: "#ff7f50",
  },
  sizeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  addToCartButton: {
    backgroundColor: "#ff7f50",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ManCoffeeData;
