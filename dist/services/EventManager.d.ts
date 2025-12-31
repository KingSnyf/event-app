import { Event, EventCategory } from "../models/Event.js";
import { User } from "../models/User.js";
import { Registration } from "../models/Registration.js";
export declare class EventManager {
    private events;
    private users;
    private registrations;
    private readonly STORAGE_KEYS;
    constructor();
    private chargerDonnees;
    private sauvegarderDonnees;
    private mettreAJourCompteurs;
    ajouterEvent(event: Event): void;
    obtenirTousLesEvents(): Event[];
    obtenirEventParId(id: number): Event | undefined;
    filtrerParCategorie(categorie: EventCategory): Event[];
    ajouterUser(user: User): User;
    obtenirUserParEmail(email: string): User | undefined;
    obtenirTousLesUsers(): User[];
    inscrireUserAEvent(eventId: number, nom: string, email: string): {
        success: boolean;
        message: string;
    };
    obtenirInscriptionsPourEvent(eventId: number): Registration[];
    reinitialiser(): void;
}
export declare const eventManager: EventManager;
