class Exercise {
    id: string;
    categoryIds: string[];
    title: string;
    imageUrl: string;

    constructor(id: string, categoryIds: string[], title: string, imageUrl: string) {
        this.id = id;
        this.categoryIds = categoryIds;
        this.title = title;
        this.imageUrl = imageUrl;
    }
}

export default Exercise;