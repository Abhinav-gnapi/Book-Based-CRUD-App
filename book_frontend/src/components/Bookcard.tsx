export const BookCard = ({ book }: { book: any }) => (
  <div className="w-[240px] p-[1rem] rounded-md border border-gray-300 bg-white p-4 shadow-sm hover:shadow-md transition
">
    
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
      <span className="font-semibold">Genre:</span>{" "}
      {book.genre.join(", ")}
    </p>

    <p className="text-sm p-[3px]">
      <span className="font-semibold">reviewCount:</span> {book.reviewCount}
    </p>

  </div>
);
