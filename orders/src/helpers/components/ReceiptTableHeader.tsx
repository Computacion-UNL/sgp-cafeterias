import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "rgb(226, 232, 240)";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "rgb(203 213 225 )",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  description: {
    width: "60%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  unitPrice: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  total: {
    width: "15%",
  },
});

export const ReceiptTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.description}>Producto</Text>
    <Text style={styles.qty}>Cantidad</Text>
    <Text style={styles.unitPrice}>Precio Unitario</Text>
    <Text style={styles.total}>Total</Text>
  </View>
);
