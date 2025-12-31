import { Event } from "../models/Event.js";
import { User } from "../models/User.js";
import { Registration } from "../models/Registration.js";

export class EventService {
  private events: Event[] = [];
  private users: User[] = [];
  private registrations: Registration[] = [];

  

  addEvent(event: Event): void {
    this.events.push(event);
  }

  getAllEvents(): Event[] {
    return this.events;
  }

  getEventById(id: number): Event | undefined {
    return this.events.find(e => e.id === id);
  }

  

  inscrireUtilisateur(eventId: number, name: string, email: string): void {
    
    const event = this.getEventById(eventId);
    if (!event) throw new Error("Événement introuvable");

   
    if (event.estPasse()) throw new Error("Événement déjà passé");

    
    const nombreInscrits = this.registrations.filter(r => r.eventId === eventId).length;
    if (nombreInscrits >= event.capaciteMax) throw new Error("Événement complet");

   
    const userExist = this.users.find(u => u.email === email);
    if (userExist) {
      const dejaInscrit = this.registrations.some(r => r.eventId === eventId && r.userId === userExist.id);
      if (dejaInscrit) throw new Error("Utilisateur déjà inscrit à cet événement");
    }

   
    let user = userExist;
    if (!user) {
      user = new User(name, email);
      this.users.push(user);
    }

   
    const registration = new Registration(eventId, user.id);
    this.registrations.push(registration);

    
    event.inscritsCount = this.registrations.filter(r => r.eventId === eventId).length;
  }

  

  getInscriptionsByEvent(eventId: number): Registration[] {
    return this.registrations.filter(r => r.eventId === eventId);
  }
}
