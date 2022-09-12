import { PaginatedModel } from "@cafetho/shared";
import { getModelForClass, plugin, prop, Ref } from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Order } from "./index";
import { Product } from "./Product";

@plugin(mongooseAutoPopulate)
class ProductOrder extends PaginatedModel {
  @prop({ required: true })
  public quantity!: number;

  @prop({ required: true })
  public totalPrice!: number;

  @prop({ required: true })
  public unitPrice!: number;

  @prop({
    required: true,
    ref: () => Order,
  })
  public order!: Ref<Order>;

  @prop({
    required: true,
    ref: () => Product,
    autopopulate: { select: "name description urlPhoto" },
  })
  public product!: Ref<Product>;
}

const ProductOrderModel = getModelForClass(ProductOrder);

export { ProductOrder, ProductOrderModel };
