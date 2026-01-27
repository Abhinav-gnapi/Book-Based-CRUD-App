export const sort_fields = ["title", "publicationYear", "price", "reviewCount"] as const;
export const genre = ["Fantasy", "Sci-Fi", "Romance", "Horror", "Biography", "History", "Drama", "Educational"] as const;
export type sortField = typeof sort_fields[number];
export type Genre = typeof genre[number];