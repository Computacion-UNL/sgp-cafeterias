import { PaginatedModel } from "@cafetho/shared";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Rol } from "./Rol";

class Privilege extends PaginatedModel {
  @prop({ required: true, unique: true })
  public name!: string;

  @prop({ default: true })
  public status?: boolean;

  @prop({ required: true, ref: () => Rol })
  public roles!: Ref<Rol>[];
}

const PrivilegeModel = getModelForClass(Privilege);

export { Privilege, PrivilegeModel };
