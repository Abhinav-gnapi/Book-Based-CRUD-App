import React, { useState } from "react";

export const ReviewCard = ({ 
  review, 
  onEdit, 
  onDelete
}: { 
  review: any;
  onEdit?: (reviewId: string) => void;
  onDelete?: (Id: string) => void;
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className=" rounded-md border border-gray-300 bg-white p-[1rem] shadow-lg hover:shadow-gray-500 transition cursor-pointer relative"
      onClick={() => setShowActions(!showActions)}
    >

    <p className="text-sm p-[3px]">
        {review.user}
      </p>

      <p className="text-sm p-[3px]">
        <span className="font-semibold">rating:</span> {review.rating}
      </p>

      <p className="text-sm p-[3px]">
        <span className="font-semibold">comment:</span> {review.comment}
      </p>

      {showActions && (
        <div className="mt-[6px] flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(review._id);
            }}
            className="flex-1 bg-gray-400 py-[4px] rounded-[8px]"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(review._id);
            }}
            className="flex-1 bg-gray-400 py-[4px] rounded-[6px]"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};