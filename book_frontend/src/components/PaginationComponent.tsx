export const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex mt-[5rem] items-center justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-[8px] border p-[4px] text-sm disabled:opacity-50"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`rounded-[8px] p-[4px] text-sm font-medium
              ${
                page === pageNumber
                  ? "bg-indigo-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-[8px] border p-[4px] text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
