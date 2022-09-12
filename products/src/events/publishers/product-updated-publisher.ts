import { ProductUpdatedEvent, Publisher, Subjects } from "@cafetho/shared";

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  readonly subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
}
