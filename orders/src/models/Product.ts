import { PaginatedModel } from "@cafetho/shared";
import {
  getModelForClass,
  modelOptions,
  plugin,
  prop,
  ReturnModelType,
} from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

@modelOptions({ schemaOptions: { versionKey: "version" } })
@plugin(updateIfCurrentPlugin)
@plugin(mongooseAutoPopulate)
class Product extends PaginatedModel {
  @prop({ required: true, unique: true })
  public name!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public urlPhoto!: string;

  @prop({ required: true })
  public publicIdPhoto!: string;

  @prop()
  public description?: string;

  @prop({ default: true })
  public status?: boolean;

  public static async findByEvent(
    this: ReturnModelType<typeof Product>,
    event: { id: string; version: number }
  ) {
    return this.findOne({ _id: event.id, version: event.version - 1 });
  }
}

const ProductModel = getModelForClass(Product);

export { Product, ProductModel };
