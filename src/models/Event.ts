export type EventCategory = "conférence" | "sport" | "atelier" | "autre";

export class Event {
  public id: number;
  public titre: string;
  public description: string;
  public date: Date;
  public lieu: string;
  public categorie: EventCategory;
  public capaciteMax: number;
  public inscritsCount: number = 0;

  constructor(
    titre: string,
    description: string,
    date: Date,
    lieu: string,
    categorie: EventCategory,
    capaciteMax: number
  ) {
    this.id = Date.now() + Math.floor(Math.random() * 1000);
    this.titre = titre;
    this.description = description;
    this.date = date;
    this.lieu = lieu;
    this.categorie = categorie;
    this.capaciteMax = capaciteMax;
  }

  estPasse(): boolean {
    return this.date.getTime() < Date.now();
  }

  estComplet(): boolean {
    return this.inscritsCount >= this.capaciteMax;
  }

  placesRestantes(): number {
    return this.capaciteMax - this.inscritsCount;
  }

  getDateFormatee(): string {
    return this.date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
  }
}
