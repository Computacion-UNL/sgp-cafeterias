import { ProductCreatedEvent, Publisher, Subjects } from "@cafetho/shared";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly subject: Subjects.ProductCreated = Subjects.ProductCreated;
}
