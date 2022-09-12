import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import { currencyFormat } from "../utils";

const borderColor = "rgb(226, 232, 240)";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "rgb(203 213 225 )",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "85%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

export const ReceiptTableFooter = (props: { total: number }) => {
  const { total } = props;

  return (
    <View style={styles.row}>
      <Text style={styles.description}>TOTAL</Text>
      <Text style={styles.total}>{currencyFormat(total)}</Text>
    </View>
  );
};
