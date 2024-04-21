import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineAddBox } from 'react-icons/md';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/book?page=${currentPage}&limit=10`)
      .then(response => {
        setBooks(response.data.data);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <div className="flex">
          <Link to="/book/create" className="mr-4">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
          <Link to="/pos">
            <button className="text-lg text-sky-800 border border-sky-800 px-4 py-2 rounded-md hover:bg-sky-800 hover:text-white">
              POS
            </button>
          </Link>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md">No</th>
                <th className="border border-slate-600 rounded-md">Title</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
                <th className="border border-slate-600 rounded-md">Operations</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book.id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center">{(currentPage - 1) * 10 + index + 1}</td>
                  <td className="border border-slate-600 rounded-md text-center">{book.title}</td>
                  <td className="border border-slate-600 rounded-md max-md:hidden">{book.author}</td>
                  <td className="border border-slate-600 rounded-md max-md:hidden">{book.publishYear}</td>
                  <td className="border border-slate-600 rounded-md">
                    <Link to={`book/details/${book._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`book/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`book/delete/${book._id}`}>
                      <AiOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            {/* Previous button */}
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`text-lg border px-4 py-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-default' : 'text-sky-800 border-sky-800 pointer-events-auto hover:bg-sky-800 hover:text-white'}`}
            >
              Previous
            </button>
              {/* Page numbering */}
              <p className="text-lg">{`Page ${currentPage} of ${totalPages}`}</p>
            {/* Next button */}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`text-lg border px-4 py-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-default' : 'text-sky-800 border-sky-800 pointer-events-auto hover:bg-sky-800 hover:text-white'}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
