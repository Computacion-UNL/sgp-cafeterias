import { PaginatedModel } from "@cafetho/shared";
import { getModelForClass, prop } from "@typegoose/typegoose";

class Address extends PaginatedModel {
  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public phone!: string;

  @prop({ required: true })
  public mainStreet!: string;

  @prop()
  public secondaryStreet?: string;
}

const AddressModel = getModelForClass(Address);

export { Address, AddressModel };
