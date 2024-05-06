import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteBookData, getBooksData } from "../apiactions/actions";

const Home = () => {
  const [books, setBooks] = useState([]);

  const deleteBook = async (id) => {
    if (window.confirm("Are you sure delete this Book details")) {
      await deleteBookData(id);
      const booksData = await getBooksData();
      setBooks(booksData);
    }
  };

  useEffect(() => {
    (async () => {
      const booksData = await getBooksData();
      setBooks(booksData);
    })();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-10 bg-white m-auto mt-5 rounded">
          <div className=" d-flex justify-content-between mt-3">
            <h1 className=" p-2">Books Collection</h1>
            <Link to="form" className=" p-2">
              <button className="btn btn-primary fs-4">Add Book</button>
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-borderless mt-5">
              <thead>
                <tr>
                  <th scope="col">Sr.No.</th>
                  <th scope="col">Book Name</th>
                  <th scope="col">Author Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.bookname}</td>
                    <td>{item.author}</td>
                    <td>{item.quantity}</td>
                    <td className="d-flex pt-2 gap-4 fs-5">
                      <Link to={`/book/${item.id}`}>
                        <FaEdit className="edit-icon" />
                      </Link>
                      <Link>
                        <MdDelete
                          className="delete-icon"
                          onClick={() => deleteBook(item.id)}
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
