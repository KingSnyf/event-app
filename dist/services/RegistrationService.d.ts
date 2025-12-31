export declare class RegistrationService {
    private registrations;
    isRegistered(userId: number, eventId: number): boolean;
    count(eventId: number): number;
    register(userId: number, eventId: number): void;
}
