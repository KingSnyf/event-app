import { Event } from "../models/Event.js";
import { User } from "../models/User.js";
import { Registration } from "../models/Registration.js";
export class EventManager {
    constructor() {
        this.events = [];
        this.users = [];
        this.registrations = [];
        this.STORAGE_KEYS = {
            EVENTS: "eventapp_events",
            USERS: "eventapp_users",
            REGISTRATIONS: "eventapp_registrations",
        };
        this.chargerDonnees();
    }
    chargerDonnees() {
        const eventsData = localStorage.getItem(this.STORAGE_KEYS.EVENTS);
        if (eventsData) {
            const parsed = JSON.parse(eventsData);
            this.events = parsed.map((e) => {
                const event = Object.create(Event.prototype);
                Object.assign(event, e);
                event.date = new Date(e.date);
                return event;
            });
        }
        const usersData = localStorage.getItem(this.STORAGE_KEYS.USERS);
        if (usersData) {
            const parsed = JSON.parse(usersData);
            this.users = parsed.map((u) => Object.assign(Object.create(User.prototype), u));
        }
        const regsData = localStorage.getItem(this.STORAGE_KEYS.REGISTRATIONS);
        if (regsData) {
            const parsed = JSON.parse(regsData);
            this.registrations = parsed.map((r) => {
                const reg = Object.create(Registration.prototype);
                Object.assign(reg, r);
                reg.dateInscription = new Date(r.dateInscription);
                return reg;
            });
        }
        this.mettreAJourCompteurs();
    }
    sauvegarderDonnees() {
        localStorage.setItem(this.STORAGE_KEYS.EVENTS, JSON.stringify(this.events));
        localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(this.users));
        localStorage.setItem(this.STORAGE_KEYS.REGISTRATIONS, JSON.stringify(this.registrations));
    }
    mettreAJourCompteurs() {
        this.events.forEach(event => {
            event.inscritsCount = this.registrations.filter(r => r.eventId === event.id).length;
        });
    }
    ajouterEvent(event) {
        this.events.push(event);
        this.sauvegarderDonnees();
    }
    obtenirTousLesEvents() {
        return this.events;
    }
    obtenirEventParId(id) {
        return this.events.find(e => e.id === id);
    }
    filtrerParCategorie(categorie) {
        return this.events.filter(e => e.categorie === categorie);
    }
    ajouterUser(user) {
        const exist = this.users.find(u => u.email === user.email);
        if (exist)
            return exist;
        this.users.push(user);
        this.sauvegarderDonnees();
        return user;
    }
    obtenirUserParEmail(email) {
        return this.users.find(u => u.email === email);
    }
    obtenirTousLesUsers() {
        return this.users;
    }
    inscrireUserAEvent(eventId, nom, email) {
        const event = this.obtenirEventParId(eventId);
        if (!event)
            return { success: false, message: "Événement introuvable" };
        if (event.estPasse())
            return { success: false, message: "Événement déjà passé" };
        if (event.estComplet())
            return { success: false, message: "Événement complet" };
        if (!User.isValidEmail(email))
            return { success: false, message: "Email invalide" };
        let user = this.obtenirUserParEmail(email);
        if (!user)
            user = this.ajouterUser(new User(nom, email));
        const dejaInscrit = this.registrations.some(r => r.eventId === eventId && r.userId === user.id);
        if (dejaInscrit)
            return { success: false, message: "Vous êtes déjà inscrit à cet événement" };
        this.registrations.push(new Registration(eventId, user.id));
        this.mettreAJourCompteurs();
        this.sauvegarderDonnees();
        return { success: true, message: `Inscription réussie ! (${event.inscritsCount}/${event.capaciteMax})` };
    }
    obtenirInscriptionsPourEvent(eventId) {
        return this.registrations.filter(r => r.eventId === eventId);
    }
    reinitialiser() {
        this.events = [];
        this.users = [];
        this.registrations = [];
        localStorage.clear();
    }
}
export const eventManager = new EventManager();
//# sourceMappingURL=EventManager.js.map