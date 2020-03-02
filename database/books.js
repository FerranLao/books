import Book from "../models/Book";

export const findBooks = async () => {
  const result = await Book.find()
  return result;
};
