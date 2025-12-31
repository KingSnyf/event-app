import { Event, EventCategory } from "../models/Event.js";
import { User } from "../models/User.js";
import { Registration } from "../models/Registration.js";

export class EventManager {
  private events: Event[] = [];
  private users: User[] = [];
  private registrations: Registration[] = [];

  private readonly STORAGE_KEYS = {
    EVENTS: "eventapp_events",
    USERS: "eventapp_users",
    REGISTRATIONS: "eventapp_registrations",
  };

  constructor() {
    this.chargerDonnees();
  }

  private chargerDonnees(): void {
    const eventsData = localStorage.getItem(this.STORAGE_KEYS.EVENTS);
    if (eventsData) {
      const parsed = JSON.parse(eventsData);
      this.events = parsed.map((e: any) => {
        const event = Object.create(Event.prototype);
        Object.assign(event, e);
        event.date = new Date(e.date);
        return event;
      });
    }

    const usersData = localStorage.getItem(this.STORAGE_KEYS.USERS);
    if (usersData) {
      const parsed = JSON.parse(usersData);
      this.users = parsed.map((u: any) => Object.assign(Object.create(User.prototype), u));
    }

    const regsData = localStorage.getItem(this.STORAGE_KEYS.REGISTRATIONS);
    if (regsData) {
      const parsed = JSON.parse(regsData);
      this.registrations = parsed.map((r: any) => {
        const reg = Object.create(Registration.prototype);
        Object.assign(reg, r);
        reg.dateInscription = new Date(r.dateInscription);
        return reg;
      });
    }

    this.mettreAJourCompteurs();
  }

  private sauvegarderDonnees(): void {
    localStorage.setItem(this.STORAGE_KEYS.EVENTS, JSON.stringify(this.events));
    localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(this.users));
    localStorage.setItem(this.STORAGE_KEYS.REGISTRATIONS, JSON.stringify(this.registrations));
  }

  private mettreAJourCompteurs(): void {
    this.events.forEach(event => {
      event.inscritsCount = this.registrations.filter(r => r.eventId === event.id).length;
    });
  }

  ajouterEvent(event: Event): void {
    this.events.push(event);
    this.sauvegarderDonnees();
  }

  obtenirTousLesEvents(): Event[] {
    return this.events;
  }

  obtenirEventParId(id: number): Event | undefined {
    return this.events.find(e => e.id === id);
  }

  filtrerParCategorie(categorie: EventCategory): Event[] {
    return this.events.filter(e => e.categorie === categorie);
  }

  ajouterUser(user: User): User {
    const exist = this.users.find(u => u.email === user.email);
    if (exist) return exist;
    this.users.push(user);
    this.sauvegarderDonnees();
    return user;
  }

  obtenirUserParEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  obtenirTousLesUsers(): User[] {
    return this.users;
  }

  inscrireUserAEvent(eventId: number, nom: string, email: string): { success: boolean; message: string } {
    const event = this.obtenirEventParId(eventId);
    if (!event) return { success: false, message: "Événement introuvable" };
    if (event.estPasse()) return { success: false, message: "Événement déjà passé" };
    if (event.estComplet()) return { success: false, message: "Événement complet" };
    if (!User.isValidEmail(email)) return { success: false, message: "Email invalide" };

    let user = this.obtenirUserParEmail(email);
    if (!user) user = this.ajouterUser(new User(nom, email));

    const dejaInscrit = this.registrations.some(r => r.eventId === eventId && r.userId === user.id);
    if (dejaInscrit) return { success: false, message: "Vous êtes déjà inscrit à cet événement" };

    this.registrations.push(new Registration(eventId, user.id));
    this.mettreAJourCompteurs();
    this.sauvegarderDonnees();

    return { success: true, message: `Inscription réussie ! (${event.inscritsCount}/${event.capaciteMax})` };
  }

  obtenirInscriptionsPourEvent(eventId: number): Registration[] {
    return this.registrations.filter(r => r.eventId === eventId);
  }

  reinitialiser(): void {
    this.events = [];
    this.users = [];
    this.registrations = [];
    localStorage.clear();
  }
}

export const eventManager = new EventManager();
