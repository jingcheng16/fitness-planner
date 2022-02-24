class Exercise {
  category: number;
  creation_date: string;
  description: string;
  equipment: string[];
  exercise_base: number;
  id: number;
  language: number;
  license: number;
  license_authors: string;
  muscles: string[];
  muscles_secondary: string[];
  name: string;
  status: string;
  uuid: string;
  variations: number[];

  constructor(
    category: number,
    creation_date: string,
    description: string,
    equipment: string[],
    exercise_base: number,
    id: number,
    language: number,
    license: number,
    license_authors: string,
    muscles: string[],
    muscles_secondary: string[],
    name: string,
    status: string,
    uuid: string,
    variations: number[]
  ) {
    this.category = category;
    this.creation_date = creation_date;
    this.description = description;
    this.equipment = equipment;
    this.exercise_base = exercise_base;
    this.id = id;
    this.language = language;
    this.license = license;
    this.license_authors = license_authors;
    this.muscles = muscles;
    this.muscles_secondary = muscles_secondary;
    this.name = name;
    this.status = status;
    this.uuid = uuid;
    this.variations = variations;
  }
}

// class Exercise {
//     id: string;
//     categoryIds: string[];
//     title: string;
//     imageUrl: string;

//     constructor(id: string, categoryIds: string[], title: string, imageUrl: string) {
//         this.id = id;
//         this.categoryIds = categoryIds;
//         this.title = title;
//         this.imageUrl = imageUrl;
//     }
// }

export default Exercise;
