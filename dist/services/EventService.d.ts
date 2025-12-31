import { Event } from "../models/Event.js";
import { Registration } from "../models/Registration.js";
export declare class EventService {
    private events;
    private users;
    private registrations;
    addEvent(event: Event): void;
    getAllEvents(): Event[];
    getEventById(id: number): Event | undefined;
    inscrireUtilisateur(eventId: number, name: string, email: string): void;
    getInscriptionsByEvent(eventId: number): Registration[];
}
