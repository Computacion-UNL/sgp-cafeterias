import { PaginatedModel } from "@cafetho/shared";
import { getModelForClass, plugin, prop, Ref } from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Product } from "./Product";
import { Receipt } from "./Receipt";

@plugin(mongooseAutoPopulate)
class ProductReceipt extends PaginatedModel {
  @prop({ required: true })
  public quantity!: number;

  @prop({ required: true })
  public totalPrice!: number;

  @prop({ required: true })
  public unitPrice!: number;

  @prop({ required: true, ref: () => Receipt })
  public receipt!: Ref<Receipt>;

  @prop({
    required: true,
    ref: () => Product,
    autopopulate: { select: "name description urlPhoto" },
  })
  public product!: Ref<Product>;
}

const ProductReceiptModel = getModelForClass(ProductReceipt);

export { ProductReceipt, ProductReceiptModel };
