export interface UserProfile {
    username: string;
    name: string;
    surname: string;
    email: string;
    creationDate: string;
    companyName?: string;
    phoneNumber?: string;
    notificationService?: string;
    numberOfVehicles?: number;
    ownerId?: number;
    firebaseTokens: string[];
}