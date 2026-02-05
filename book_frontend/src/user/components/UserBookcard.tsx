import React, { useState } from "react";

export const BookCard = ({ 
  book, 
  onReview, 
  onWishlist 
}: { 
  book: any;
  onReview?: (bookId: string) => void;
  onWishlist?: (bookId: string) => void;
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className="rounded-md border border-gray-300 bg-white p-[1rem] shadow-lg hover:shadow-gray-500 transition cursor-pointer relative"
      onClick={() => setShowActions(!showActions)}
    >
      <p className="text-sm p-[0.8rem] grid grid-cols-3 text-center">
        <span className="font-semibold text-left">{book.title}</span> 
        <span className="font-semibold">{book.author}</span> 
        <span className="font-semibold">{book.publicationYear}</span> 
      </p>

      {/* Action Buttons */}
      {showActions && (
        <div className="mt-[6px]  justify-evenly flex">
          <button className="p-3 bg-green-200 py-[4px] rounded-[8px] border-1"
            onClick={(e) => {
              e.stopPropagation();
              onWishlist?.(book._id);
            }}>
            Add to WishList
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReview?.(book._id);
            }}
            className="p-3 bg-yellow-200 py-[4px] rounded-[8px] border-1"
          >
            Review
          </button>
        </div>
      )}
    </div>
  );
};