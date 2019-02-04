export interface Category {
    createdAt: Date;
    uid: string;
    value: string;
    updateAtd?: Date;
    subcategories: Topic;
}

export interface Topic {
    uid: string;
    value: string;
}
