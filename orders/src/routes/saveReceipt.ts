import {
  authorization,
  OrderStatus,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { nanoid } from "nanoid";
import { sendMail } from "../config";
import { createReceiptTemplate, ReceiptTemplateData } from "../helpers";
import {
  OrderModel,
  PaymentModel,
  ProductReceiptModel,
  ReceiptModel,
} from "../models";

const saveReceiptRouter = Router();

saveReceiptRouter.post(
  "/receipts",
  requireAuth,
  authorization(Permissions["save:receipt"]),
  async (req: Request, res: Response) => {
    const { fullName, dni, phone, email, address, order, amount, type, items } =
      req.body;

    const pay = new PaymentModel({ amount, type });
    await pay.save();
    const receipt = new ReceiptModel({
      code: nanoid(10),
      fullName,
      dni,
      phone,
      email,
      address,
      order,
      payment: pay.id,
    });

    const productReceipt = items.map((item: any) => ({
      ...item,
      receipt: receipt.id,
    }));
    await OrderModel.findByIdAndUpdate(order, {
      status: OrderStatus.completed,
    });
    await receipt.save();
    const productsReceipt = await ProductReceiptModel.insertMany(
      productReceipt,
      { populate: { path: "product", select: "name description urlPhoto" } }
    );

    // if email field is provided, an email to customer should be sending
    if (email) {
      // create a pdf stream
      const result = await createReceiptTemplate({
        companyEmail: "cafeterias@email.com",
        companyName: "Cafeterias Loja",
        companyPhone: "09687843548984",
        receipt: receipt as ReceiptTemplateData["receipt"],
        items: productsReceipt as any,
      });

      // send pdf as attachment to customer email
      const chunks: Uint8Array[] = [];
      result.on("data", (chunk) => chunks.push(chunk));
      result.on("end", () => {
        const content = Buffer.concat(chunks);
        sendMail({
          to: email,
          text: `Hola ${fullName}. Se ha generado tu nuevo comprobante de pago con código: ${receipt.code}`,
          attachments: [{ filename: `Comprobante-${receipt.id}.pdf`, content }],
        });
      });
    }

    res.status(201).json(receipt);
  }
);

export { saveReceiptRouter };
