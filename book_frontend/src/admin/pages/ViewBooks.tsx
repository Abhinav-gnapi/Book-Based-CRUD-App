import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { BookCard } from "../../components/Bookcard";
import { Pagination } from "../../components/PaginationComponent";

const genres = [
  "Fantasy",
  "Sci-Fi",
  "Romance",
  "Horror",
  "Biography",
  "History",
  "Drama",
  "Educational",
];

const ViewBooks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchBooks(1);
  }, [selectedGenres, sortBy, order]);

  useEffect(() => {
    fetchBooks(page);
  }, [page, search]);

  const fetchBooks = async (pageNumber: number) => {
    const res = await api.get("/admin/viewAllBooks", {
      params: {
        page: pageNumber,
        limit,
        genre: selectedGenres.join(","),
        sortBy,
        order,
        search,
      },
    });

    setBooks(res.data.books);
    setTotalPages(res.data.totalPages);
    setPage(res.data.page);
  };

  return (
    <>
      {/* Search */}
      <header className="flex h-16 items-center justify-end bg-white px-12 shadow-sm">
        <input
          placeholder="Search for books"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="w-60 rounded border px-3 py-2 text-sm"
        />
      </header>

      {/* Filters */}
      <div className="ml-64 bg-white p-4 shadow-sm flex flex-wrap gap-6 justify-center">
        {genres.map((g) => (
          <label key={g} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedGenres.includes(g)}
              onChange={(e) =>
                setSelectedGenres((prev) =>
                  e.target.checked
                    ? [...prev, g]
                    : prev.filter((x) => x !== g)
                )
              }
            />
            {g}
          </label>
        ))}

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Newest</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {/* Books */}
      <div className="ml-64 mt-8 flex flex-wrap gap-10">
        {books.map((b) => (
          <BookCard key={b._id} book={b} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
};

export default ViewBooks;
