import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { BookCard } from "../components/WishlistBookCard";
import type { Book } from "../../interfaces/Book.interface";

interface WishlistItem {
  _id: string;
  book: Book;
  user: string;
  createdAt: string;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
  try {
    setLoading(true);
    setError(null);

    const res = await api.get("/user/wishlist");

    setWishlistItems(res.data.items);
  } catch (error: any) {
    setError(error.response?.data?.message || "Failed to load wishlist");
  } finally {
    setLoading(false);
  }
};

  const handleRemove = async (bookId: string) => {
  try {
    await api.delete(`/user/wishlist/remove/${bookId}`);

    setWishlistItems(prev =>
      prev.filter(item => item.book._id !== bookId)
    );
  } catch (error: any) {
    alert(error.response?.data?.message || "Failed to remove book");
  }
};

  if (loading) {
    return (
      <div className="px-[5rem] py-[3rem] flex justify-center items-center min-h-[400px]">
        <p className="text-lg">Loading your wishlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-[5rem] py-[3rem] flex flex-col justify-center items-center min-h-[400px]">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={fetchBooks}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="px-[5rem] py-[3rem] flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-2">Your wishlist is empty</p>
          <p className="text-sm text-gray-500">Start adding books to your wishlist!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-[5rem] py-[3rem]">
      <h1 className="text-[1.3rem] font-bold mb-[1rem]">
        My Wishlist ({wishlistItems.length} {wishlistItems.length === 1 ? 'book' : 'books'})
      </h1>
      <div className="flex flex-wrap gap-10">
        {wishlistItems.map((item) => (
        <BookCard
            key={item._id}
            book={item.book}
            onRemove={() => handleRemove(item.book._id)}
        />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;