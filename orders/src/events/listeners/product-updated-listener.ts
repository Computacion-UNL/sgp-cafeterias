import {
  Listener,
  NotFoundError,
  ProductUpdatedEvent,
  Subjects,
} from "@cafetho/shared";
import { Message } from "node-nats-streaming";
import { ProductModel } from "../../models";
import { queueGroupName } from "./queue-group-name";

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  readonly subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: ProductUpdatedEvent["data"], msg: Message) {
    const { name, price, publicIdPhoto, status, urlPhoto, description } = data;
    const product = await ProductModel.findByEvent(data);

    if (!product) throw new NotFoundError();
    product.set({ name, price, publicIdPhoto, status, urlPhoto, description });
    await product.save();

    msg.ack();
  }
}
