import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/CartContext";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Checkout">;

const CheckoutScreen = () => {
  const cartContext = useContext(CartContext);
  const navigation = useNavigation<NavigationProp>();

  if (!cartContext) {
    return <Text>Loading...</Text>;
  }

  const { cart, totalPrice, clearCart } = cartContext;

  const handleCheckout = () => {
    Alert.alert("Success", "Your order has been placed!", [
      {
        text: "OK",
        onPress: () => {
          clearCart();
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Removed Checkout title */}

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
            <Text style={styles.breakdownText}>
              {item.quantity ?? 1} x ${item.price.toFixed(2)} = ${((item.quantity ?? 1) * item.price).toFixed(2)}
            </Text>
          </View>
        )}
      />

      <Text style={styles.totalText}>Total: ${totalPrice().toFixed(2)}</Text>

      <TouchableOpacity style={styles.confirmButton} onPress={handleCheckout}>
        <Text style={styles.confirmButtonText}>Confirm Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  cartItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: { fontSize: 16, fontWeight: "bold" },
  priceText: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  breakdownText: { fontSize: 14, color: "#555", marginTop: 2 },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 10,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  confirmButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default CheckoutScreen;
