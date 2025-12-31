export class User {
    constructor(nom, email) {
        this.id = Date.now();
        this.nom = nom;
        this.email = email;
    }
    static isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
}
//# sourceMappingURL=User.js.map