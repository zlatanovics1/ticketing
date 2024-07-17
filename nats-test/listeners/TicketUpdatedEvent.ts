import { Message } from "node-nats-streaming";
import { TicketUpdatedEvent } from "../events";
import { Listener } from "../listener";
import { Subjects } from "../subjects";

class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated;
  groupName = "ticket/updated";

  onMessage(data: TicketUpdatedEvent["data"], msg: Message): void {
    console.log("Message received");

    msg.ack();
  }
}
