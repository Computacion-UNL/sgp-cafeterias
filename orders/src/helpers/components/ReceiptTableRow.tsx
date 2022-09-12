import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";
import { ReceiptTemplateData } from "../createReceiptTemplate";
import { currencyFormat } from "../utils";

const borderColor = "rgb(226, 232, 240)";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "rgb(203 213 225 )",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  productName: {
    width: "60%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  unitPrice: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  totalPrice: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

export const ReceiptTableRow = (props: {
  items: ReceiptTemplateData["items"];
}) => {
  const { items } = props;

  const rows = items.map((item) => (
    <View style={styles.row} key={item.id}>
      <Text style={styles.productName}>{item.product.name}</Text>
      <Text style={styles.qty}>{item.quantity}</Text>
      <Text style={styles.unitPrice}>{currencyFormat(item.unitPrice)}</Text>
      <Text style={styles.totalPrice}>{currencyFormat(item.totalPrice)}</Text>
    </View>
  ));

  return <Fragment>{rows}</Fragment>;
};
