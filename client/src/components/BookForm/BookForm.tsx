import { useLocation, useNavigate } from "react-router-dom";

import { addNewBookToStack, editBook } from "../../services/APIClient";
import { Book } from "../../utils/types";

import { BookFormFields } from "../../utils/formFields";
import GenericForm from "../MenusAndForms/genericForms/GenericForm";
import { useForm, SubmitHandler } from "react-hook-form";

import "./BookForm.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { addNewBookToStack as addNewBookAction } from "../../store/slices/stackSlice";
import {
  addBook,
  editBook as editBookAction,
} from "../../store/slices/bookSlice";

const blankForm: Record<string, number | string> = {
  title: "",
  author: "",
  totalPages: 0,
  bookType: "paper",
  publisher: "",
  ISBN: "",
  OLID: "",
  description: "",
};

// enum BookTypeEnum {
//   paper = "paper",
//   ebook = "e-book",
//   audioBook = "audio-book",
// }

type Inputs = {
  title: string;
  author: string;
  totalPages: number;
  bookType: "paper" | "e-book" | "audio-book";
  publisher: string;
  ISBN: string;
  OLID: string;
  description: string;
};

export default function BookForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { book, edit, hasImg } = location.state as {
    book: Record<string, string | number>;
    edit: boolean;
    hasImg: boolean | undefined;
  };

  const stack = useAppSelector((state) => state.stack.currentStack);
  if (!stack) {
    navigate("/");
    return <></>;
  }

  const { register, handleSubmit } = useForm<Inputs>();

  const initialFormVals = book || blankForm;

  async function submitBook(values: Record<string, number | string>) {
    const book = values as unknown as Book; //guaranteed to have all necessary fields for adding a new book
    if (!book.hasImg) book.hasImg = hasImg || false;

    if (!edit) {
      const newBook = await addNewBookToStack(stack!.id, stack!.type, book);
      dispatch(addBook(newBook));
      dispatch(addNewBookAction({ bookId: newBook.id, stack: stack! }));
    } else {
      await editBook(book);
      dispatch(editBookAction(book));
    }

    navigate("/");
  }

  const fields = BookFormFields;

  const title = edit ? "Edit Book" : `Add New Book To ${stack!.name}`;
  const submitText = edit ? "Edit Book" : `Add Book`;

  return (
    <div className="book-form-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit(console.log)}>
        <div>
          <label>Title: </label>
          <input {...register("title")} />
        </div>
        <div>
          <label>Author: </label>
          <input {...register("author")} />
        </div>
        <div>
          <label>Total Pages: </label>
          <input {...register("totalPages")} />
        </div>
        <div>
          <label>Publisher: </label>
          <input {...register("publisher")} />
        </div>
        <div>
          <label>Book Type: </label>
          <div>
            <label>Paper: </label>
            <input type="radio" {...register("bookType")} value="paper" />
            <label>E-Book: </label>
            <input type="radio" {...register("bookType")} value="e-book" />
            <label>Audio Book: </label>
            <input type="radio" {...register("bookType")} value="audio-book" />
          </div>
        </div>
        <div>
          <label>ISBN: </label>
          <input {...register("ISBN")} />
        </div>
        <div>
          <label>OLID: </label>
          <input {...register("OLID")} />
        </div>
        <div>
          <label>Description: </label>
          <textarea {...register("description")} />
        </div>

        <button type="submit">{submitText}</button>
      </form>
    </div>
  );
}

{
  /* <GenericForm
  formName="book-form"
  formFields={fields}
  submitText={submitText}
  onFormSubmit={submitBook}
  initialValues={initialFormVals}
/> */
}
