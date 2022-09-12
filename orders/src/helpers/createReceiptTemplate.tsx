import ReactPDF, {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { formatInTimeZone } from "date-fns-tz";
import { es } from "date-fns/locale";
import React from "react";
import { Payment, ProductReceipt, Receipt } from "../models";
import { Product } from "../models/Product";
import {
  ReceiptTableBlankSpace,
  ReceiptTableFooter,
  ReceiptTableHeader,
  ReceiptTableRow,
} from "./components";
import { currencyFormat } from "./utils";

export type ReceiptTemplateData = {
  companyName: string;
  companyPhone: string;
  companyEmail: string;
  receipt: Receipt & { payment: Payment };
  items: (ProductReceipt & {
    product: Pick<Product, "name" | "description" | "urlPhoto">;
  } & { id: string })[];
};

interface PDFProps {
  data: ReceiptTemplateData;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#fafbf6",
    fontSize: 11,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: "#131925",
    marginBottom: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 400,
    color: "#131925",
    marginBottom: 8,
  },
  statement: {
    fontSize: 20,
    color: "#131925",
    lineHeight: 1.4,
    marginBottom: 4,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#999999",
    margin: "24px 0 24px 0",
  },
  paragraph: {
    fontSize: 12,
    color: "#212935",
    lineHeight: 1.67,
  },
  columnParent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnStart: {
    flex: 1,
  },
  columnEnd: {
    flex: 1,
    alignItems: "flex-end",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "rgb(226, 232, 240)",
  },
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

const tableRowsCount = 5;

const PDF = ({ data }: PDFProps) => {
  const { receipt, companyEmail, companyName, companyPhone, items } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.columnParent}>
            <View style={styles.columnStart}>
              <Text style={styles.title}>{companyName}</Text>
              <Text style={styles.paragraph}>{companyPhone}</Text>
              <Text style={styles.paragraph}>{companyEmail}</Text>
            </View>
            <View style={styles.columnEnd}>
              <Text style={styles.heading}>Comprobante</Text>
              <Text style={styles.paragraph}>Código: {receipt.code}</Text>
              <Text style={styles.paragraph}>
                Fecha de emisión:{" "}
                {formatInTimeZone(receipt.date!, "America/Guayaquil", "P", {
                  locale: es,
                })}
              </Text>
              <Text style={styles.paragraph}>
                Método de pago: {receipt.payment.type}
              </Text>
            </View>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.billTo}>Adquiriente:</Text>
            <Text>{receipt.fullName}</Text>
            <Text>{receipt.dni}</Text>
            <Text>{receipt.phone}</Text>
            <Text>{receipt.email}</Text>
            <Text>{receipt.address}</Text>
          </View>

          <View style={styles.tableContainer}>
            <ReceiptTableHeader />
            <ReceiptTableRow items={items} />
            <ReceiptTableBlankSpace rowsCount={tableRowsCount - items.length} />
            <ReceiptTableFooter total={receipt.payment.amount} />
          </View>

          <View style={styles.divider}></View>

          <View>
            <Text style={styles.statement}>{`${currencyFormat(
              receipt.payment.amount
            )} pagado el ${formatInTimeZone(
              receipt.date!,
              "America/Guayaquil",
              "PPP",
              {
                locale: es,
              }
            )}`}</Text>
            <Text style={styles.paragraph}>¡Gracias por su compra!</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const createReceiptTemplate = async (data: ReceiptTemplateData) => {
  return await ReactPDF.renderToStream(<PDF {...{ data }} />);
};
