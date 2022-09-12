import { Subjects } from "./subjets";

export interface ProductUpdatedEvent {
  subject: Subjects.ProductUpdated;
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
