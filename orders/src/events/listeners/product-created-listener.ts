import { Listener, ProductCreatedEvent, Subjects } from "@cafetho/shared";
import { Message } from "node-nats-streaming";
import { ProductModel } from "../../models/Product";
import { queueGroupName } from "./queue-group-name";

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  readonly subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: ProductCreatedEvent["data"], msg: Message) {
    const product = new ProductModel({ ...data, _id: data.id });
    await product.save();
    msg.ack();
  }
}
