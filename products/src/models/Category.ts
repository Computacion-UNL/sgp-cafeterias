import { PaginatedModel } from "@cafetho/shared";
import { getModelForClass, prop } from "@typegoose/typegoose";

class Category extends PaginatedModel {
  @prop({ required: true, unique: true })
  public name!: string;

  @prop()
  public description?: string;

  @prop({ default: true })
  public status?: boolean;
}

const CategoryModel = getModelForClass(Category);

export { Category, CategoryModel };
