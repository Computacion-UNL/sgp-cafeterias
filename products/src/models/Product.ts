import { PaginatedModel } from "@cafetho/shared";
import {
  getModelForClass,
  modelOptions,
  plugin,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Category } from "./Category";

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
  public status!: boolean;

  @prop({
    required: true,
    ref: () => Category,
    autopopulate: { select: "name" },
  })
  public category!: Ref<Category>;

  public version!: number;
}

const ProductModel = getModelForClass(Product);

export { Product, ProductModel };
