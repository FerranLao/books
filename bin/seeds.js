const mongoose = require("mongoose");
const Book = require("../models/Book");
const nameGenerator = require("project-name-generator");

mongoose
  .connect("mongodb://localhost/bookApi", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const authors = [
  "Isaac Asimov",
  "JRR Tolkien",
  "Arturo Perez",
  "Antonio Gonzalez",
  "Christie Golden",
  "Andrej Sapkpowski",
  "Lola Flores",
  "Gustavo Fraile",
  "Thomas Jones"
];
const categories = [
  "Fiction",
  "Romance",
  "Fantasy",
  "Science fiction",
  "Terror",
  "History"
];
const bookGenerator = () => ({
  title: nameGenerator().dashed,
  price: Math.round((Math.random() * (50 - 5) + 5)*100)/100,
  year: Math.round(Math.random() * (2019 - 1989) + 1989),
  author: authors[Math.floor(Math.random() * authors.length)],
  category: categories[Math.floor(Math.random() * categories.length)]
});

const books = new Array(150).fill("").map(e => bookGenerator());
console.log(books);
Promise.all(books.map(async book => await Book.create(book)))
  .then(() => {
    mongoose.disconnect();
    console.log("books created");
  })
  .catch(e => console.log("Error creating database", e));
