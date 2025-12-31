import { Registration } from "../models/Registration.js";
export class RegistrationService {
    constructor() {
        this.registrations = [];
    }
    isRegistered(userId, eventId) {
        return this.registrations.some(r => r.userId === userId && r.eventId === eventId);
    }
    count(eventId) {
        return this.registrations.filter(r => r.eventId === eventId).length;
    }
    register(userId, eventId) {
        this.registrations.push(new Registration(eventId, userId));
    }
}
//# sourceMappingURL=RegistrationService.js.map