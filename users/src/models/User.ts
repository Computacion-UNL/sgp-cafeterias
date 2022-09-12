import { PaginatedModel } from "@cafetho/shared";
import {
  getModelForClass,
  modelOptions,
  plugin,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Password } from "../config/password";
import { Entity } from "./Entity";
import { Rol } from "./Rol";

@plugin(mongooseAutoPopulate)
@pre<User>("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.password);
    this.password = hashed;
  }
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  },
})
class User extends PaginatedModel {
  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ default: true })
  public status?: boolean;

  @prop({ required: true, ref: () => Rol, autopopulate: { select: "name" } })
  public rol!: Ref<Rol>;

  @prop({ required: true, ref: () => Entity, autopopulate: true })
  public entity!: Ref<Entity>;
}

const UserModel = getModelForClass(User);

export { User, UserModel };
