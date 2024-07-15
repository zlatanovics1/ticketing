import { Subjects } from "./subjects";

export class TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    name: string;
    price: number;
  };
}
