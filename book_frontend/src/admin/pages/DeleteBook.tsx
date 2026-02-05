import React, { useState } from "react";
import api from "../../api/axios";
import ButtonField from "../../components/ButtonField";

const DeleteBook: React.FC = () => {
  const [formData, setFormData] = useState({
    id: ""
  });
  const [error, setError] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null)
    setMsg(null)

    try{
      const res = await api.delete('/admin/deleteBook/${formData.id}')
      const user = res.data.user

      if (user.success) {
        setMsg(res.data.message);
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
  };

  return (
    <div className=" bg-slate-50 mt-[3rem]">
      <div className="mx-auto max-w-[35rem] rounded-[1rem] bg-white p-[3rem] shadow-lg">
        <h1 className="mb-[10px] text-2xl font-semibold text-slate-800">
          📘 Delete Book
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block text-sm pl-[5px] py-[5px] font-medium text-slate-600">
              ID
            </label>
            <div className="flex flex-wrap justify-around">
            <input
              name="id"
              value={formData.id}
              onChange={(e) => {setFormData({id: e.target.value})}}
              className="w-[70%] rounded-lg border p-[2px]"
              required
            />

            <ButtonField id="submit" data="Delete Book" type='submit'
                className='w-[25%]
                p-[7px]
                rounded-[10px]
                font-semibold
                text-[#fff]
                bg-gradient-to-br from-indigo-500 to-purple-600
                transition-all duration-150
                hover:-translate-y-0.5
                hover:shadow-[0_8px_20px_rgba(102,126,234,0.35)]
                disabled:opacity-60
                disabled:cursor-not-allowed'
            />
            </div>
            {error && msg ? (
              <div className=" mb-[-0.6rem] px-[1rem] py-[.2rem] text-sm text-red-700 items-center bg-red-100 rounded-lg">
                {error}
              </div>
            ) : (<div className=" mb-[-0.6rem] px-[1rem] py-[.2rem] text-sm text-green-700 items-center bg-red-100 rounded-lg">
                {msg}
              </div>
            )}
        </form>
      </div>
    </div>
  );
};
export default DeleteBook;