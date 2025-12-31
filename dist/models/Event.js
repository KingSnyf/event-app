export class Event {
    constructor(titre, description, date, lieu, categorie, capaciteMax) {
        this.inscritsCount = 0;
        this.id = Date.now() + Math.floor(Math.random() * 1000);
        this.titre = titre;
        this.description = description;
        this.date = date;
        this.lieu = lieu;
        this.categorie = categorie;
        this.capaciteMax = capaciteMax;
    }
    estPasse() {
        return this.date.getTime() < Date.now();
    }
    estComplet() {
        return this.inscritsCount >= this.capaciteMax;
    }
    placesRestantes() {
        return this.capaciteMax - this.inscritsCount;
    }
    getDateFormatee() {
        return this.date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
    }
}
//# sourceMappingURL=Event.js.map