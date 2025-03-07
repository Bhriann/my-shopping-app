import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Cart">;

const CartScreen = () => {
  const cartContext = useContext(CartContext);
  const navigation = useNavigation<NavigationProp>();

  if (!cartContext) {
    return <Text>Loading...</Text>;
  }

  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = cartContext;
  const isCartEmpty = cart.length === 0;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);

  return (
    <View style={styles.container}>
      {isCartEmpty ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemText}>{item.name}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() =>
                    item.quantity === 1 ? removeFromCart(item.id) : decreaseQuantity(item.id)
                  }
                  style={styles.quantityButton}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity ?? 1}</Text>
                <TouchableOpacity
                  onPress={() => increaseQuantity(item.id)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.priceText}>${item.price * (item.quantity ?? 1)}</Text>
              <Text style={styles.breakdownText}>
                ${item.price} x {item.quantity ?? 1} = ${item.price * (item.quantity ?? 1)}
              </Text>
            </View>
          )}
        />
      )}

      {!isCartEmpty && <Text style={styles.totalText}>Total: ${totalAmount}</Text>}

      <TouchableOpacity
        style={[styles.checkoutButton, isCartEmpty && styles.disabledButton]}
        onPress={() => navigation.navigate("Checkout")}
        disabled={isCartEmpty}
      >
        <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  emptyCartText: { fontSize: 18, textAlign: "center", marginVertical: 20 },
  cartItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: { fontSize: 16, fontWeight: "bold" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  quantityText: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  priceText: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  breakdownText: { fontSize: 14, color: "#555", marginTop: 2 },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 10,
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  checkoutButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  disabledButton: { backgroundColor: "#ccc" },
});

export default CartScreen;





