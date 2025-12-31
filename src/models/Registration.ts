export class Registration {
  public eventId: number;
  public userId: number;
  public dateInscription: Date;

  constructor(eventId: number, userId: number) {
    this.eventId = eventId;
    this.userId = userId;
    this.dateInscription = new Date();
  }
}
