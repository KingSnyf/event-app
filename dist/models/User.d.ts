export declare class User {
    id: number;
    nom: string;
    email: string;
    constructor(nom: string, email: string);
    static isValidEmail(email: string): boolean;
}
