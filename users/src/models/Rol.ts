import { PaginatedModel } from "@cafetho/shared";
import { getModelForClass, prop } from "@typegoose/typegoose";

class Rol extends PaginatedModel {
  @prop({ required: true, unique: true })
  public name!: string;

  @prop({ default: true })
  public status?: boolean;
}

const RolModel = getModelForClass(Rol);

export { Rol, RolModel };
