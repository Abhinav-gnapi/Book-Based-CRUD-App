import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { BookCard } from "../components/UserBookcard";
import { Pagination } from "../../components/PaginationComponent";
import { useNavigate } from "react-router-dom";
import type { Book } from "../../interfaces/Book.interface";

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

const ViewAllBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate()

  useEffect(() => {
    fetchBooks(page);
  }, [page, selectedGenres, sortBy, order, search]);

  useEffect(() => {
  setPage(1);
}, [selectedGenres, sortBy, order, search]);


  const fetchBooks = async (pageNumber: number) => {
    try{
      const res = await api.get("/user/viewAllBooks", {
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
  }catch(error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleReview = (bookId: string) => {
    console.log("Review book:", bookId);
    navigate(`/books/${bookId}/review`);
  };

  const handleWishlist = async (bookId: string) => {
    try {
      const response = await api.post(`/user/wishlist/add/${bookId}`);
      
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error: any) {
      console.error("Error adding book to wishlist:", error);
      const errorMessage = error.response?.data?.message || "Failed to add book to wishlist";
      alert(errorMessage);
    }
  };

  return (
    <>
      <div className=" bg-white py-[1rem] shadow-sm flex flex-wrap gap-6 justify-center">
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

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-[6px] border px-[2px] py-1 text-sm">
          <option value="createdAt">Newest</option>
          <option value="title">Title</option>
          <option value="publicationYear">Publication Year</option>
          <option value="reviewCount">Review Count</option>
          <option value="price">Price</option>
        </select>

        <select className="rounded-[6px] border px-[7px] text-sm"
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {/* Books */}
      <div className="px-[5rem] py-[3rem] flex flex-col flex-wrap gap-3">
        {books.map((b) => (
          <BookCard key={b._id} book={b} onWishlist={handleWishlist} onReview={handleReview}/>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
};

export default ViewAllBooks;
