import {findBooks} from "../database/books"

export const findBooksByQuery=async (req,res)=>{
    try{
        const books = await findBooks()
        res.json(books)
    }catch(e){
        console.log(e)
        res.sendStatus(e.statusCode||500).send(e.message||"something went wrong")
    }
}