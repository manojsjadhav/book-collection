import React, { useEffect} from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { bookSchema } from "../validationSchema/valiSchema";
import { addBookData, editBookData, getBookData } from "../apiactions/actions";
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {
  const initValue = {
    bookname: "",
    author: "",
    quantity: 0,
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    values,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    errors,
    setValues,
  } = useFormik({
    initialValues: initValue,
    validationSchema: bookSchema,
    onSubmit: async (values, action) => {
      if (values.id) {
        await editBookData(values.id, values);
        navigate("/");
      } else {
        await addBookData({ ...values, id: uuidv4() });
        navigate("/");
      }
      action.resetForm();
    },
  });
  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getBookData(id);
        setValues(data);
      })();
    }
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-10 bg-white m-auto mt-5 rounded">
          <h1 className="text-center m-2">
            {" "}
            {id ? "Update Book" : " Add Book"}
          </h1>
          <form action="" className="row m-2 " onSubmit={handleSubmit}>
            <div className="col-12 col-sm-4">
              <label htmlFor="bookname" className="form-label">
                Bookname
              </label>
              <input
                type="text"
                name="bookname"
                value={values?.bookname}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                id="bookname"
              />
              {errors.bookname && touched.bookname ? (
                <p className="text-danger">{errors.bookname}</p>
              ) : null}
            </div>
            <div className="col-12 col-sm-4">
              <label htmlFor="authorname" className="form-label">
                Authorname
              </label>
              <input
                type="text"
                className="form-control"
                id="authorname"
                name="author"
                value={values?.author}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.author && touched.author ? (
                <p className="text-danger">{errors.author}</p>
              ) : null}
            </div>
            <div className="col-12 col-sm-4 ">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={values?.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.quantity && touched.quantity ? (
                <p className="text-danger">{errors.quantity}</p>
              ) : null}
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button className="btn btn-primary fs-6" type="submit">
                {id ? "Update Book" : " Add Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
