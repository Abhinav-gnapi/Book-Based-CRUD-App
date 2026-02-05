import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import ButtonField from "../../components/ButtonField";
import { useParams } from "react-router-dom";

const genreOptions = [
  "Fantasy",
  "Sci-Fi",
  "Romance",
  "Horror",
  "Biography",
  "History",
  "Drama",
  "Educational",
];

const UpdateBook: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publicationYear: "",
    genres: [] as string[],
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if(!bookId) console.log(bookId);
    fetchBook();
  }, [bookId]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/viewSingleBook/${bookId}`);
      
      const bookData = res.data.book;
      
      setFormData({
        title: bookData.title || "",
        author: bookData.author || "",
        publicationYear: bookData.publicationYear?.toString() || "",
        genres: bookData.genre || [],
        price: bookData.price?.toString() || "",
      });
      
      setError(null);
    } catch (error: any) {
      console.error("Error fetching book:", error);
      setError(error.response?.data?.message || "Failed to load book");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMsg(null);

    try {
      const res = await api.patch(`/admin/updateBook/${bookId}`, {
        title: formData.title,
        author: formData.author,
        publicationYear: Number(formData.publicationYear),
        genre: formData.genres,
        price: Number(formData.price),
      });

      if (res.data.success) {
        setMsg(res.data.message);
        fetchBook();
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="mt-[7rem] flex justify-center">
        <div className="text-lg">Loading book...</div>
      </div>
    );
  }

  return (
    <div className="mt-[7rem]">
      <div className="mx-auto max-w-[35rem] rounded-[1rem] bg-white p-[3rem] shadow-lg">
        <h1 className="mb-[10px] text-2xl font-semibold text-slate-800">
          📘 Update Book
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm py-[5px] font-medium text-slate-600">
                Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm py-[5px] font-medium text-slate-600">
                Author
              </label>
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm py-[5px] font-medium text-slate-600">
                Publication Year
              </label>
              <input
                type="number"
                name="publicationYear"
                value={formData.publicationYear}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm py-[5px] font-medium text-slate-600">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                className="w-full rounded-lg border p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm py-[5px] font-medium text-slate-600">
              Genre
            </label>
            <div className="flex flex-wrap gap-3">
              {genreOptions.map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 p-[5px] text-sm cursor-pointer rounded-3xl hover:bg-slate-200"
                >
                  <input
                    type="checkbox"
                    checked={formData.genres.includes(g)}
                    onChange={() => handleGenreChange(g)}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="mt-[1rem] px-[1rem] py-[.5rem] text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          {msg && (
            <div className="px-[1rem] py-[.5rem] text-sm text-green-700 bg-green-100 rounded-lg">
              {msg}
            </div>
          )}

          <div className="flex justify-center pt-[1.4rem]">
            <ButtonField
              id="submit"
              data="Update Book"
              type="submit"
              className="w-[80%]
                p-[7px]
                rounded-[10px]
                font-semibold
                text-[#fff]
                bg-gradient-to-br from-indigo-500 to-purple-600
                transition-all duration-150
                hover:-translate-y-0.5
                hover:shadow-[0_8px_20px_rgba(102,126,234,0.35)]
                disabled:opacity-60
                disabled:cursor-not-allowed"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;