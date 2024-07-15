import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract readonly subject: T["subject"];
  abstract readonly groupName: string;
  private client: Stan;
  protected ackTime = 10 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setDeliverAllAvailable()
      .setDurableName(this.groupName);
  }
  listen() {
    this.client.subscribe(
      this.subject,
      this.groupName,
      this.subscriptionOptions()
    );
  }
  abstract onMessage(data: T["data"], msg: Message): void;
}
