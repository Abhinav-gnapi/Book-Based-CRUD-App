import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { ReviewCard } from "../components/ReviewCard";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import type { ReviewItem } from "../../interfaces/Review.interface";


const Review: React.FC = () => {
  const [review, setReview] = useState<ReviewItem[]>([]);
  const navigate = useNavigate()
  const { bookId } = useParams<{ bookId: string }>();

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = async () => {
    try{
      const res = await api.get(`/user/books/viewAllReviews/${bookId}`);

      setReview(res.data);
  }catch(error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleEdit = (reviewId: string) => {
    console.log("Edit review:", reviewId);
    navigate(`/books/${bookId}/review/edit/${reviewId}`)
  };

  const handleDelete = async (reviewId: string) => {
  const confirmDelete = window.confirm("Do you want to delete this review?");
  if (!confirmDelete) return;

  try {
    const response = await api.delete(`/user/books/deleteReview/${reviewId}`);

    if (response.data.success) {
      alert(response.data.message);

      setReview(prev =>
        prev.filter(review => review._id !== reviewId)
      );
    }
  } catch (error: any) {
    console.error("Error deleting review:", error);
    alert(error.response?.data?.message || "Failed to delete review");
  }
};


    if (review.length === 0) {
    return (
        <div className="px-[5rem] py-[3rem] flex justify-center items-center min-h-[400px]">
        <div className="text-center">
            <p className="text-lg text-gray-600 mb-2">No Reviews</p>
        </div>
        </div>
    );
    }
  return (
    <>

      <div className="px-[5rem] py-[3rem] flex flex-col flex-wrap gap-10">
        {review.map((r) => (
          <ReviewCard key={r._id} review={r} onEdit={handleEdit} onDelete={handleDelete}/>
        ))}
      </div>
    </>
  );
};

export default Review;
