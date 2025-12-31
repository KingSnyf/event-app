import { Registration } from "../models/Registration.js";

export class RegistrationService {
  private registrations: Registration[] = [];

  isRegistered(userId: number, eventId: number): boolean {
    return this.registrations.some(
      r => r.userId === userId && r.eventId === eventId
    );
  }

  count(eventId: number): number {
    return this.registrations.filter(r => r.eventId === eventId).length;
  }

  register(userId: number, eventId: number): void {
    this.registrations.push(new Registration(eventId, userId));
  }
}
