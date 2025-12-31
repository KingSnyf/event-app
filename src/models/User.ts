export class User {
  public id: number;
  public nom: string;
  public email: string;

  constructor(nom: string, email: string) {
    this.id = Date.now();
    this.nom = nom;
    this.email = email;
  }

  static isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }
}
