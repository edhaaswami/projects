const express = require("express");
const router = express.Router();
const Book = require("../models/Book");


// ➤ Add Book
router.post("/add", async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.json(book);
    } catch (err) {
        res.status(500).json(err);
    }
});


// ➤ Get All Books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json(err);
    }
});


// ➤ Update Book
router.put("/update/:id", async (req, res) => {
    try {
        const updated = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
});


// ➤ Delete Book
router.delete("/delete/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Book deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;