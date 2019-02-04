import { Roles } from './roles';
import { Social } from './social';

export interface Editor {
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
    roles?: Roles;
    age?: string;
    occupation?: string;
    social?: Social;
    position?: string;
    description?: string;
    description_long?: string;
    followerCount?: number;
    followedCount?: number;
    visitCount?: number;
    image?: string;
}
