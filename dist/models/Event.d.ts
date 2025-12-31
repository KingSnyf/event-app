export type EventCategory = "conférence" | "sport" | "atelier" | "autre";
export declare class Event {
    id: number;
    titre: string;
    description: string;
    date: Date;
    lieu: string;
    categorie: EventCategory;
    capaciteMax: number;
    inscritsCount: number;
    constructor(titre: string, description: string, date: Date, lieu: string, categorie: EventCategory, capaciteMax: number);
    estPasse(): boolean;
    estComplet(): boolean;
    placesRestantes(): number;
    getDateFormatee(): string;
}
