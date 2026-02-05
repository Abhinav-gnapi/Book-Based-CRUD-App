import React, { useState } from "react";

export const BookCard = ({ 
  book, 
  onEdit, 
  onDelete 
}: { 
  book: any;
  onEdit?: (bookId: string) => void;
  onDelete?: (bookId: string) => void;
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className="w-[240px] rounded-md border border-gray-300 bg-white p-[1rem] shadow-lg hover:shadow-gray-500 transition cursor-pointer relative"
      onClick={() => setShowActions(!showActions)}
    >
      <p className="text-sm p-[3px]">
        <span className="font-semibold">Title:</span> {book.title}
      </p>

      <p className="text-sm p-[3px]">
        <span className="font-semibold">Author:</span> {book.author}
      </p>

      <p className="text-sm p-[3px]">
        <span className="font-semibold">Year:</span> {book.publicationYear}
      </p>

      <p className="text-sm p-[3px]">
        <span className="font-semibold">Price:</span> ₹{book.price}
      </p>

      <p className="text-sm p-[3px]">
        <span className="font-semibold">Genre:</span> {book.genre.join(", ")}
      </p>

      <p className="text-sm p-[3px]">
        <span className="font-semibold">reviewCount:</span> {book.reviewCount}
      </p>

      {/* Action Buttons */}
      {showActions && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(book._id);
            }}
            className="flex-1 bg-blue-500 text-white py-[4px] rounded-[8px] hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(book._id);
            }}
            className="flex-1 bg-red-500 text-white py-[4px] rounded-[6px] hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};