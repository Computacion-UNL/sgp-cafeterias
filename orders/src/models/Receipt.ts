import { PaginatedModel } from "@cafetho/shared";
import { getModelForClass, plugin, prop, Ref } from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Order } from "./Order";
import { Payment } from "./Payment";

@plugin(mongooseAutoPopulate)
class Receipt extends PaginatedModel {
  @prop({ required: true, unique: true })
  public code!: string;

  @prop({ required: true })
  public fullName!: string;

  @prop({ required: true })
  public dni!: string;

  @prop()
  public phone?: string;

  @prop()
  public email?: string;

  @prop()
  public address?: string;

  @prop({ type: Date, default: new Date() })
  public date?: Date;

  @prop({ required: true, ref: () => Order, autopopulate: true })
  public order!: Ref<Order>;

  @prop({ required: true, ref: () => Payment, autopopulate: true })
  public payment!: Ref<Payment>;
}

const ReceiptModel = getModelForClass(Receipt);

export { Receipt, ReceiptModel };
