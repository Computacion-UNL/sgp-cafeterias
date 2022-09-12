import { PaginatedModel } from "@cafetho/shared";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./User";

class RecoveryToken extends PaginatedModel {
  @prop({ required: true, ref: () => User })
  public user!: Ref<User>;

  @prop({ required: true })
  public token!: string;

  @prop({ type: Number, required: true })
  public expires!: number;

  public get isExpired() {
    return Date.now() >= this.expires;
  }
}

const RecoveryTokenModel = getModelForClass(RecoveryToken);

export { RecoveryToken, RecoveryTokenModel };
