import axios from "axios";
// const url = "http://localhost:5500";
const url = "https://book-collection-server.onrender.com";

export const getBooksData = async () => {
  try {
    const result = await axios.get(`${url}/books`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const getBookData = async (id) => {
  try {
    console.log(id);
    const result = await axios.get(`${url}/books/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const addBookData = async (data) => {
  await axios.post(`${url}/books`, data);
};
export const editBookData = async (id, data) => {
  await axios.put(`${url}/books/${id}`, data);
};
export const deleteBookData = async (id) => {
  await axios.delete(`${url}/books/${id}`);
};
