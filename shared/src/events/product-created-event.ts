import { Subjects } from "./subjets";

export interface ProductCreatedEvent {
  subject: Subjects.ProductCreated;
  data: {
    id: string;
    version: number;
    name: string;
    price: number;
    urlPhoto: string;
    publicIdPhoto: string;
    description?: string;
    status: boolean;
  };
}
