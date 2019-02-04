import { User } from './user';

export interface Post {
    uid: string;
    user: User;
    createdAt: Date;
    updateAt?: Date;
    category: string;
    subcategory: string;
    title: string;
    description: string;
    content: string;
    tags?: object;
    visitCount: number;
    state: string;
    image: string;
    imageName: string;
    thumbnails: object;
    recommended: boolean;
}
