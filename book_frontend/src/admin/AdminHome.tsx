import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { BookCard } from "../components/Bookcard";
import { Pagination } from "../components/PaginationComponent";

const menu = ["View All Books", "Add Book", "Update Book", "Delete Book"];

const AdminHome: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("View All Books");
  const [books, setBooks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

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


  useEffect(() => {
    fetchBooks(1);
  }, [selectedGenres, sortBy, order]);

  useEffect(() => {
    if (activeMenu === "View All Books") {
      fetchBooks(page);
    }
  }, [activeMenu, page, search]);


  const fetchBooks = async (pageNumber = page) => {
  try {
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
    // setLimit(res.data.limit)
  } catch (error) {
    console.error("Failed to fetch books", error);
  }
};

    
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-800 to-slate-900 p-[1rem] text-slate-200 shadow-xl">
    {/* Brand */}
    <div className="flex h-16 items-center gap-1 px-4 text-xl font-semibold">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow">
        B
      </span>
      <span className="tracking-wide">store</span>
    </div>


    {/* Menu */}
    <nav className=" p-[1.5rem] space-y-2">
      {menu.map((item) => (
        <button
          key={item}
          onClick={() => setActiveMenu(item)}
          className={`relative w-full rounded-xl p-[1rem] text-left text-sm font-medium transition-all
            ${
              activeMenu === item
                ? "bg-white/10 text-white shadow-inner"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
        >
          {item}
        </button>

      ))}
    </nav>
  </aside>


      {/* Main */}
      <div className="flex flex-1 flex-col">

          {/* <div className="flex items-center gap-4 mr-[2rem] bg-white
          ">
            <button className="h-9 w-9 rounded-full border bg-white" />
            <button className="h-9 w-9 rounded-full border bg-gray-50" />
            <button className="h-9 w-9 rounded-full border bg-gray-50" />
          </div> */}
        

        {/* Content */}
        {/* <main className="ml-64 min-h-screen bg-slate-50 p-6"> */}
          {activeMenu === "View All Books" && (
            <>
            <header className="flex h-16 items-center p-[3rem] justify-end bg-white shadow-sm">
            <div className="relative w-60">
              <input
                type="text"
                placeholder="Search for books"
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="w-full mr-[3srem] rounded-[6px] border pl-[0.6rem] text-sm focus:outline-none focus:ring-2 bg-white
                  text-[#333]
                  placeholder:text-gray-400
                  outline-none
                  transition-all duration-200
                  focus:border-indigo-800
                  focus:ring-indigo-500/20"
              />
            </div>
            </header>
            <div className="ml-64 py-[1rem] bg-white p-4 shadow-sm flex flex-wrap gap-6 items-center justify-center">
            <div className="flex flex-wrap gap-3">
            <div className="flex flex-wrap gap-3">
              {genres.map((g) => (
                <label key={g} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(g)}
                    onChange={(e) => {
                      setPage(1);
                      setSelectedGenres((prev) =>
                        e.target.checked
                          ? [...prev, g]
                          : prev.filter((x) => x !== g)
                      );
                    }}
                  />
                  {g}
                </label>
              ))}
            </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
            <select
              value={sortBy}
              onChange={(e) => {
                setPage(1);
                setSortBy(e.target.value);
              }}
              className="rounded-md border px-3 py-2 text-sm"
            >
              <option value="createdAt">Newest</option>
              <option value="title">Title</option>
              <option value="publicationYear">Publication Year</option>
              <option value="price">Price</option>
              <option value="reviewCount">Review Count</option>
            </select>
            
            
            <select
              value={order}
              onChange={(e) => {
                setPage(1);
                setOrder(e.target.value as "asc" | "desc");
              }}
              className="rounded-md border px-3 py-2 text-sm"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            </div>
            </div>

            <div className="flex flex-wrap gap-10 mt-[2rem] ml-[22rem]">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
          </>
          )}
        {/* </main> */}
      </div>
    </div>
  );
};
export default AdminHome;
