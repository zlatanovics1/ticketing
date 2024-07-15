import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "../events";
import { Listener } from "../listener";
import { Subjects } from "../subjects";

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated;
  groupName = "ticket/created";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Message received.");

    msg.ack();
  }
}
