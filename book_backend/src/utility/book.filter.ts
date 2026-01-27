import { genre, Genre } from "../constants/book.constants";

export const buildFilter = (genreQuery?: string) => {
  const filter: any = {};

  if (!genreQuery) return filter;

  const genres = genreQuery.split(",").map(g => g.trim());

  const invalidGenres = genres.filter(
    g => !genre.includes(g as Genre)
  );

  if (invalidGenres.length > 0) {
    throw new Error(
      `Invalid genre(s): ${invalidGenres.join(", ")}`
    );
  }

  filter.genre = { $all: genres };
  return filter;
};
