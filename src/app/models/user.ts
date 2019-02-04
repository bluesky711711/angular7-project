import { Roles } from './roles';

export interface User {
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
    roles: Roles;
    image?: string;
}
