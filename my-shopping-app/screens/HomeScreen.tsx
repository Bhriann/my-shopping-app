import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
};

const HomeScreen = () => {
  const cartContext = useContext(CartContext);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isCartEmpty, setIsCartEmpty] = useState(false); 

  useEffect(() => {
    if (cartContext) {
      setIsCartEmpty(cartContext.cart.length === 0); 
    }
  }, [cartContext?.cart.length]);

  if (!cartContext) {
    return <Text>Loading...</Text>;
  }

  const { products, addToCart, cart } = cartContext;

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.productImage} resizeMode="contain" />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.author}>by {item.author}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {!isCartEmpty && (
        <TouchableOpacity
          style={[styles.cartButton, cart.length === 0 && styles.disabledButton]}
          onPress={() => cart.length > 0 && navigation.navigate("Cart")}
          disabled={cart.length === 0}
        >
          <Text style={styles.cartButtonText}>Go to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  productImage: {
    width: 150,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  author: {
    fontSize: 14,
    color: "gray",
  },
  price: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cartButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});

export default HomeScreen;





