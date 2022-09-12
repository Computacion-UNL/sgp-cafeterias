import { OrderStatus, PaginatedModel } from "@cafetho/shared";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

class Order extends PaginatedModel {
  @prop({ required: true, unique: true })
  public code!: string;

  @prop({ required: true })
  public totalValue!: number;

  @prop({ default: OrderStatus.create, enum: Object.values(OrderStatus) })
  public status?: OrderStatus;

  @prop()
  public table?: string;

  @prop({ ref: "User", required: true })
  public user!: Ref<"User">;
}

const OrderModel = getModelForClass(Order);

export { Order, OrderModel };
