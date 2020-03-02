import express from "express";
import { findBooksByQuery} from "../controllers/books"
const router = express.Router();


router.get("/getBooks",findBooksByQuery)

module.exports = router