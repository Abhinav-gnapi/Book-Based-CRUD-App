import { sortField, sort_fields } from "../constants/book.constants";

export const buildSort = (
  sortBy?: string,
  order?: string
): Record<string, 1 | -1> => {
  const sortOptions: Record<string, 1 | -1> = {};

  if (sortBy && sort_fields.includes(sortBy as sortField)) {
    sortOptions[sortBy] = order === "asc" ? 1 : -1;
  } else {
    sortOptions.createdAt = -1;
  }

  return sortOptions;
};
