import * as Yup from "yup";

export const bookSchema = Yup.object({
  bookname: Yup.string().required("Enter Book name"),
  author: Yup.string().required("Enter Author name"),
  quantity: Yup.number().min(0).max(1000).required("Enter quantity"),
});
