import { PaginatedModel, PayType } from "@cafetho/shared";
import { getModelForClass, prop } from "@typegoose/typegoose";

class Payment extends PaginatedModel {
  @prop({ required: true })
  public amount!: number;

  @prop({ required: true, enum: Object.values(PayType) })
  public type!: PayType;
}

const PaymentModel = getModelForClass(Payment);

export { Payment, PaymentModel };
