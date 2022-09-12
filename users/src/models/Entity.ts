import { PaginatedModel } from "@cafetho/shared";
import { getModelForClass, plugin, prop, Ref } from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Address, User } from "./index";

@plugin(mongooseAutoPopulate)
class Entity extends PaginatedModel {
  @prop({ required: true })
  public firstname!: string;

  @prop({ required: true })
  public dni!: string;

  @prop()
  public lastname?: string;

  @prop({ default: false })
  public principal?: boolean;

  @prop({ ref: "User" })
  public user?: Ref<User>;

  @prop({ ref: () => Address, autopopulate: true })
  public address?: Ref<Address>;
}

const EntityModel = getModelForClass(Entity);

export { Entity, EntityModel };
